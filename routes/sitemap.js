const api_service = require('./utils/api_service')

/**
 * Sitemap
 */
async function sitemap(ctx) {
  const sitemap_key = ctx.request.query.sitemap_key
  const sitemap_id = ctx.params.sitemap_id
  const page_no = ctx.params.page_no

  try {

    // Validate sitemap_key
    if (sitemap_key != ctx.state.sitemap_key)
      ctx.throw(403)

    // Setup request for sitemap
    const endpoint = `/cms/sitemap/${sitemap_id}`
    const json = await api_service(ctx, endpoint, {}, 2) // API Service

    if (json == 404 || json.statusCode == 400)
      ctx.throw(404)

    // Get a slice of 20k URLs from the array
    const page_size = 20000
    let json_urls
    if (page_no) {
      json_urls = json.slice((page_no * page_size) - page_size, page_no * page_size)
    }else{
      json_urls = json
    }

    // Throw 404 if the array is empty
    if (json_urls.length == 0)
      ctx.throw(404)

    // Render sitemap
    await ctx.set('Content-type', 'text/xml')
    await ctx.render('sitemap', { layout: false, urls: json_urls })

  }catch (error) {

    ctx.throw(500, error)

  }

}

module.exports = sitemap
