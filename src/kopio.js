export default class Kopio {
  /**
   * Kopio instance constructor
   * @constructor
   * @param {string} selector - querySelector compatible string
   */
  constructor (selector) {
    this.events = { success: {}, fail: {} }
    this.container = document.body
    this.selector = (typeof selector === 'string') ? selector : '.kopio'
    this.addListeners()
  }

  /**
   * @desc Add event listeners to all selector matches
   */
  addListeners () {
    const self = this
    document.querySelectorAll(this.selector).forEach((kopio) => {
      kopio.addEventListener('click', event => self.copy(event))
    })
  }

  /**
   * @desc Creates a temp element if needed and emits copy results
   * @param {Event} - Click event
   */
  copy ({ target, originalTarget }) {
    const trigger = target || originalTarget
    let textElement, result, isTemp
    if (trigger.hasAttribute('data-kopio-target')) {
      textElement = document.querySelector(trigger.getAttribute('data-kopio-target'))
    } else if (trigger.hasAttribute('data-kopio-text')) {
      const tempText = trigger.getAttribute('data-kopio-text')
      textElement = document.createElement('div')
      textElement.appendChild(document.createTextNode(tempText))
      this.container.appendChild(textElement)
      isTemp = true
    }
    if (textElement) {
      result = this.execCopy(textElement, isTemp)
      if (result) {
        this.emit('success', trigger)
      } else {
        this.emit('error', trigger)
      }
    }
  }

  /**
   * @desc Creates range for selection and executes the copy command.
   * @param {Node} element - Element which contents need to be copied.
   * @param {boolean} isTemp - Flag for element removal.
   */
  execCopy (element, isTemp) {
    const range = document.createRange()
    range.selectNodeContents(element)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    const result = document.execCommand('copy')
    selection.removeAllRanges()
    if (isTemp) {
      element.remove()
    }
    return result
  }

  /**
   * @desc Emits events
   * @param {string} eventName
   * @param {Node} trigger
   */
  emit (eventName, trigger) {
    const event = this.events[eventName]
    if (event) {
      event(trigger)
    }
  }

  /**
   * @desc Subscribe to events
   * @param {string} eventName - Can be 'success' or 'error'
   * @param {Function} callback
   */
  on (eventName, callback) {
    if (!this.events[eventName]) {
      return
    }
    this.events[eventName] = callback
  }
}
