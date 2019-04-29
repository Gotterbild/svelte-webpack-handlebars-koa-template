/**
 * General Page
 */
async function general_page(ctx) {
  const page_template = (ctx.params.page_template == '/') ? 'home' : ctx.params.page_template

  try {

    const page_data = {
      meta_tags: {
        title: 'Home Page',
      },
    }

    // Render page
    await ctx.render(`general_page/${page_template}`, page_data)

  }catch (error) {

    ctx.throw(500, error)

  }

}

module.exports = general_page
