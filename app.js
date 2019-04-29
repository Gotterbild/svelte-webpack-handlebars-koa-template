/* global client */
/* eslint-disable no-console, no-shadow, arrow-body-style, no-global-assign, func-names */

const hbs = require('koa-hbs')
const logger = require('koa-logger')
const Raven = require('raven')
const redis = require('redis')

const Koa = require('koa')
const router = require('./router')

const app = module.exports = new Koa()
app.proxy = true

const get_redirect = require('./routes/utils/get_redirect')

// Add X-Response-Time header
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// Add HSTS header
app.use(async (ctx, next) => {
  if (ctx.protocol === 'https') {
    ctx.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  }
  await next()
})

// Redirect http:// to https://
// only in production
app.use(async (ctx, next) => {
  if (process.env.NODE_ENV === 'production' && ctx.protocol === 'http') {
    ctx.status = 301
    ctx.redirect(`https://${ctx.request.host}${ctx.request.url}`)
  }else{
    await next()
  }
})

// Redirect root domain to www
// only in production
app.use(async (ctx, next) => {
  if (process.env.NODE_ENV === 'production' && ctx.subdomains.length == 0) {
    ctx.status = 301
    ctx.redirect(`${ctx.request.protocol}://www.${ctx.request.host}${ctx.request.url}`)
  }else{
    await next()
  }
})

// logger
// only use in development
if (process.env.NODE_ENV === 'development') {
  app.use(logger())
}

// Setup Redis client
const redis_host = process.env.REDIS_HOST
client = redis.createClient(6379, redis_host)
client.on('error', (err) => {
  console.log(`Error ${err}`)
})
client.on('connect', () => {
  console.log('Connected to Redis')
})

// Custom error handler
app.use(async (ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
      ctx.throw(404)
    }
  }catch (err) {
    ctx.status = err.status || 500

    // Handle error
    if (ctx.status === 404) {
      await ctx.render('404')
    }else if (ctx.status === 422) {
      // If we get a 422 here that means the route
      // was good but the API did not return anything
      // Check for a redirect before throwing a 404
      const destination_url = await get_redirect(ctx, ctx.url)
      if (destination_url) {
        ctx.status = 301
        await ctx.redirect(destination_url)
      }else
        await ctx.render('404')
    }else{

      // Send Production 500 errors to Sentry
      if (process.env.NODE_ENV === 'production') {
        Raven.captureException(err, { req: ctx.req }, (err, eventId) => {
          console.log(`Reported error ${eventId}`)
        })
      }else{
        ctx.throw(500, err)
      }

      // Display error page
      await ctx.render('500', { status: ctx.status, error_message: 'An Error has occured and your request could not be completed.' })
    }
  }
})

// setup variables passed to the views
app.use(async (ctx, next) => {
  // Setup resource path based on if we are in testing or production mode
  // http:// in Production. Speed should be better than https://
  // API v2 is https only
  // Same API for development and production as the API is read only
  ctx.state.release_id = process.env.CIRCLE_SHA1 || 'test'
  if (process.env.NODE_ENV === 'development') {
    ctx.state.development = true
    ctx.state.resource_path = 'http://localhost:8080'
  }else{
    ctx.state.development = false
    ctx.state.resource_path = 'https://cdn.test.com'
  }
  await next()
})

// setup locale
// does not include general_page
app.use(async (ctx, next) => {
  // Get locale from URL
  const locale_regex = ctx.request.url.match(/\/(es|fr|pt)\//)
  ctx.locale = (locale_regex && locale_regex.length > 1) ? locale_regex[1] : 'en'

  // Setup global locale variables for layout and partials
  // Locale variables for Views are handled within the view
  ctx.resource_path = ctx.state.resource_path

  await next()
})

// koa-hbs
app.use(hbs.middleware({
  viewPath: `${__dirname}/views`,
  partialsPath: `${__dirname}/views/partials`,
  defaultLayout: 'layout',
  disableCache: (process.env.NODE_ENV === 'development'),
}))

app.use(router.routes())
app.use(router.allowedMethods())

// Setup country code prefix for routes
router.prefix('(/es|/fr|/pt)?')

// catch all middleware
// if no other routing rules match
// check if a redirect exists
app.use(async (ctx) => {
  const url = ctx.url.split('?')
  const destination_url = await get_redirect(ctx, url[0])
  if (destination_url) {
    ctx.status = 301
    const redirect_url = (url[1])
      ? `${destination_url}?${url[1]}`
      : destination_url

    console.log('! redirecting to', redirect_url)
    ctx.redirect(redirect_url)
  }
})

// Handle cleanup before exiting app
function cleanup() {
  client.quit()
  console.log('Disconnecting Redis')
  process.exit(1)
}
process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

// listen
if (!module.parent) app.listen(3000)
