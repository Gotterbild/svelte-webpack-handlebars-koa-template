import isOnNeededPage from 'App/Utils/isOnNeededPage'

// import Filter from './filter.svelte'

if (document.readyState !== 'loading')
  diagramGroupLogic()
else
  document.addEventListener('DOMContentLoaded', diagramGroupLogic)

function diagramGroupLogic() {
  if (! isOnNeededPage('home-page'))
    return

  console.log('home page')

  // const filter = new Filter({
  //   target: document.querySelector('DiagramsFilter'),
  //   props: {
  //     diagrams: [
  //       { name: 'demo1' },
  //       { name: 'demo2' },
  //       { name: 'demo3' },
  //       { name: 'demo4' },
  //       { name: 'demo5' },
  //       { name: 'demo6' },
  //     ],
  //   },
  // })

}
