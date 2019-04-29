/* eslint-disable no-console */

const api_service = require('./api_service')

/**
 * Gets Static Redirects
 * Passing in ctx so that we can access the api_url
 */
async function get_redirect(ctx, source) {
  // Setup request
  const endpoint = '/redirect'
  const propertiesObj = { source: source }

  try {
    const json = await api_service(ctx, endpoint, propertiesObj) // API Service
    return json.destination
  } catch (error) {
    console.error(error)
    return error
  }

}

module.exports = get_redirect
