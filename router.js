const router = require('koa-router')({ sensitive: true })

const general_page = require('./routes/general_page')

const assets = require('./routes/assets')
const sitemap = require('./routes/sitemap')
const sitemap_index = require('./routes/sitemap_index')

// route definitions
router
  // Static files
  .get('/assets/(css|js|images)/*', assets) // Static files

  // favicon.ico
  .get('/favicon.ico', assets) // favicon.ico

  .get(':page_template(/)', general_page) // Index

  // Single routes
  .get('/sitemap/:sitemap_id/:page_no([1-9]|1[0-9]|20)?', sitemap) // Sitemap
  .get('/sitemap', sitemap_index) // Sitemap Index


module.exports = router
