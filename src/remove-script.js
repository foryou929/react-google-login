export default (d, id) => {
  const element = d.getElementById(id)
  element && element.parentNode.removeChild(element)
}
