/* eslint-disable brace-style */

/**
 * Redirect Rules
 */
async function redirect(ctx) {
  const location = ctx.params.location
  const path = ctx.params.path
  const var1 = ctx.params.var1
  const var2 = ctx.params.var2

  let new_url = ''

  try {

    // Yamaha Diagram Year
    if (location == '/10/') {
      const values = {
        'Outboard': 'Yamaha-Outboard',
        'Stern-Drive': 'Yamaha-Stern-Drive',
        'Outdoor-Power-Equipment': 'Yamaha-Outdoor-Equipment',
        'Multi-purpose-Engine': 'Yamaha-UTV',
        'Jet-Drive-Pump': 'Yamaha-Jet-Drive',
      }
      const new_v = values[path]
      new_url = `/10/${new_v}/${var1}.cfm`
    }

    // Mercury Diagram Year
    else if (location == '/2/') {
      const values = {
        'FORCE': 'Force-Outboard',
        'INFLATABLE-BOAT': 'Inflatable-Boat',
        'JET': 'SportJet',
        'MARINER': 'Mariner-Outboard',
        'MERCRUISER': 'Mercruiser',
        'MERCURY': 'Mercury-Outboard',
        'MIE': 'Mercury-Inboard-Engine',
        'MISCELLANEOUS': 'Mercury-Miscellaneous',
        'MOTORGUIDE': 'MotorGuide',
        'RACE-OUTBOARD': 'Mercury-Race-Outboard',
        'RACE-STERNDRIVE': 'Mercruiser-Race-Sterndrive',
        'SEA-RAY': 'Sea-Ray',
      }
      const new_v = values[path]
      new_url = `/2/${new_v}/${var1}.cfm`
    }

    // 301 old BRP static menus
    else if (location == '/omc_parts/') { new_url = '/omc_parts.html' }

    // 301 old Mercury static menus
    else if (location == '/mercury_mercruiser_hp/') { new_url = '/mercury_mercruiser_parts.html' }

    // 301 old Yamaha groups, pages and static menus
    else if (location == '/yamaha_diagrams/' || location == '/yamaha-outboard/') { new_url = '/yamaha-outboard-parts.html' }

    // 301 based on Webmaster Tools
    else if (location == '/images/Sea_Drive/' || location == '/images/Sail_Drive/') { new_url = '/omc_parts.html' }

    // Old BRP parts diagrams
    else if (location == '/brp_parts/diagrams/') { new_url = `/johnson-evinrude/parts/${var1}.cfm` }
    else if (location == '/brp_parts/') { new_url = `/johnson-evinrude/${var1}.cfm` }

    // Old Mercury parts diagrams
    else if (location == '/mercury_parts/') {
      if (var2) { new_url = `/mercury-outboard/parts/${var1}_${var2}.cfm` }
      else{ new_url = `/mercury-outboard/${var1}.cfm` }
    }

    // Old accessories categories and products
    else if (location == '/marine/' || location == '/accessories/') { new_url = '/accessories.html' }

    // 301 old help and support URLS
    else if (location == '/help/') { new_url = '/docs/support' }

    // 301 old boat pages
    else if (location == '/boats/') { new_url = '/boats.html' }

    // if somehow a URL matched a route but did not match anything here
    else ctx.throw(404)

    // Redirect
    ctx.status = 301
    await ctx.redirect(new_url)

  }catch (error) {
    ctx.throw(500, error)
  }

}

module.exports = redirect
