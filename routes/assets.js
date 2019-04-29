const send = require('koa-send')

/**
 * Static assets
 * @TODO - Verify that there are no vulnerabilities
 */
async function assets(ctx) {
  await send(ctx, ctx.path)
}

module.exports = assets
