/* global client */
/* eslint-disable no-console */

const request = require('request-promise')
const util = require('util')
const jsonify = require('jsonify')

/**
 * Calls an API endpoint and caches the
 * response in Redis for subsequent calls
 */
async function api_service(ctx, endpoint, propertiesObj, apiVersion) {

  // Setup request
  const version = apiVersion || 1
  let url = ''
  if (version == 2) {
    url = ctx.state.api_url2 + endpoint
  }else{
    url = ctx.state.api_url + endpoint
  }

  try {

    // Promisify Redis client
    const getRedis = util.promisify(client.get).bind(client)
    const setRedis = util.promisify(client.set).bind(client)

    // Create Redis key
    const propString = Object.values(propertiesObj).join('-')
    const redis_key = `${endpoint}:${propString}:${ctx.locale}`

    // Add locale to properties object if locale is not 'en'
    // API v2 does not have language_id support
    if (ctx.locale != 'en' && version != 2)
      propertiesObj.language_id = ctx.locale

    // Check if we should clear the Redis cache
    if (ctx.querystring.indexOf('clearcache') > -1) {
      const delRedis = util.promisify(client.del).bind(client) // Promisify Redis client
      const redis_key_prefix = `${endpoint}:${propString}`
      await delRedis(`${redis_key_prefix}:en`) // Delete 'en' key
      await delRedis(`${redis_key_prefix}:es`) // Delete 'es' key
      await delRedis(`${redis_key_prefix}:pt`) // Delete 'pt' key
      await delRedis(`${redis_key_prefix}:fr`) // Delete 'fr' key
    }

    // API Service
    const redis_cache = await getRedis(redis_key) // Check Redis for cache of API response
    let json
    if (redis_cache == null) {
      json = await request.get({ url: url, qs: propertiesObj, json: false }) // Send request
      await setRedis(redis_key, json) // Save response to cache as a string
      ctx.set('X-Cache', 'Miss from Pilot') // Set Miss cache header
    }else{
      json = redis_cache
      ctx.set('X-Cache', 'Hit from Pilot') // Set Hit cache header
    }
    json = await jsonify.parse(json)

    return json

  }catch (error) {

    // The API will respond with 422 when the resource cannot be found
    // The API v2 will respond with 404 when the resource cannot be found
    // All non-2xx responses will throw an error
    if (error.statusCode === 422) {
      console.error('422 response code from API service')
      return 422
    }else if (error.statusCode === 404) {
      console.error('404 response code from API service')
      return 404
    }else{
      console.error(error)
      return error
    }

  }

}

module.exports = api_service
