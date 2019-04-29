if (document.readyState !== 'loading') {
  globalLogic()
}else{
  document.addEventListener('DOMContentLoaded', globalLogic)
}

function globalLogic() {
  // some global logic
}
