/* eslint-disable no-console */

const api_service = require('./api_service')

/**
 * Gets Content for a Page
 * Passing in ctx so that we can access the api_url
 * In the future we can pull from a CMS ie Prismic.io
 */
async function get_content(ctx, content_group, content_key) {

  // Setup request
  const endpoint = '/content'
  const propertiesObj = { content_group: content_group, content_key: content_key }

  try {
    const json = await api_service(ctx, endpoint, propertiesObj) // API Service
    return json
  }catch (error) {
    console.error(error)
    return error
  }

}

module.exports = get_content
