export default (d, id) => {
  const element = d.getElementById(id)
  element.parentNode.removeChild(element)
}
