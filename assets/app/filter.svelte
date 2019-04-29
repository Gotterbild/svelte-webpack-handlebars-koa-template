<div class="row">
  <div class="column">
    Filter
  </div>
<!--   <div class="column padding-sides padding-bottom small-12 large-6 large-push-3">
    <input
      on:input="{filterDiagrams}"
      bind:value="{search}"
      placeholder="{ l.filterDiagramsByName }"
      type="text"
      name="search"
    >
  </div>

  <div class="column padding-0">
    {#each diagramsShown as diagram, key}
      <article
        class="column small-12 medium-4 large-3"
        class="{ (key + 1 === diagramsShown.length) ? 'end' : '' }"
      >
        <a
          href="{ l_prefix + diagram.page_link }"
          title="{ diagram.page_title }"
          style="{ `background-image: url('${diagram.crowley_thumb_url}')` }"
          class="thumb"
        >
          <h3>{ diagram.page_title }</h3>
        </a>
      </article>
    {/each}
  </div> -->
</div>

<script>
// import makeNonReactiveCopy from 'App/Utils/makeNonReactiveCopy'

// let search = ''
// let diagramsShown = makeNonReactiveCopy(this.diagrams)

// funciton filterDiagrams() {
//   diagramsShown = diagrams.filter((diagram) => {
//     const srch = search.toLowerCase()
//     const diagramName = diagram.page_title.toLowerCase()
//     return diagramName.includes(srch)
//   })
// }
</script>