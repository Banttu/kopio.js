import Kopio from 'kopio.js'

const kopio = new Kopio()

kopio.on('success', (trigger) => {
  const el = document.createElement('div')
  const text = document.createTextNode('Copied')
  el.classList.add('notify')
  el.appendChild(text)
  trigger.appendChild(el)
  setTimeout(() => {
    el.remove()
  }, 500)
})
