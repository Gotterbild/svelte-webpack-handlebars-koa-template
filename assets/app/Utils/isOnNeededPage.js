export default function isOnNeededPage(page) {

  const pageIdTag = document.getElementsByClassName('page')[0]

  if (pageIdTag) {
    const hasRequiredClass = pageIdTag.classList.contains(page)
    if (hasRequiredClass)
      return true
    else
      return false
  }

  return false
}
