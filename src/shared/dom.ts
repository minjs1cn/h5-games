export function str2dom(str: string) {
  const div = document.createElement('div')
  div.innerHTML = str
  return div.firstElementChild
}
