/* eslint-disable no-console */

const api_service = require('./utils/api_service')

/**
 * Sitemap Index
 */
async function sitemap_index(ctx) {

  const sitemap_key = ctx.request.query.sitemap_key

  try {

    // Validate sitemap_key
    if (sitemap_key != ctx.state.sitemap_key)
      ctx.throw(403)

    const page_size = 20000
    const sitemaps = [
      'static',
      'diagram_group',
      'diagram_page',
      'diagram_prop',
      'diagram_year',
      'single_product',
      'single_tech_article',
      'service_bulletins',
      'repair_stories',
    ]

    const sitemap_urls = []

    // Setup request
    const endpoint = '/cms/sitemap'

    // Generate sitemap URLs
    for (const s of sitemaps) {
      // TODO Refactor this as currently every await waits for previous to finish,
      // so no parrallelization takes place. More info & examples:
      // https://eslint.org/docs/rules/no-await-in-loop#disallow-await-inside-of-loops-no-await-in-loop
      const json = await api_service(ctx, `${endpoint}/${s}`, {}, 2) // API Service

      if (json.length <= page_size) {
        const sitemap_url = `/sitemap/${s}?sitemap_key=${sitemap_key}`
        sitemap_urls.push(sitemap_url)
      }else{
        const num_pages =  Math.ceil(json.length / page_size)

        // Generate links for sitemap pages
        for (let page_no = 1; page_no <= num_pages; page_no++) {
          const sitemap_url = `/sitemap/${s}/${page_no}?sitemap_key=${sitemap_key}`
          sitemap_urls.push(sitemap_url)
        }

      }
    }

    console.log(sitemap_urls)

    // Render sitemap
    await ctx.set('Content-type', 'text/xml')
    await ctx.render('sitemap_index', { layout: false, sitemap_urls: sitemap_urls })

  }catch (error) {

    ctx.throw(500, error)

  }

}

module.exports = sitemap_index
