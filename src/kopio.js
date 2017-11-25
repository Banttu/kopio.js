export default class Kopio {
  /**
   * Kopio instance constructor
   * @constructor
   * @param {string} selector - querySelector compatible string
   */
  constructor(selector) {
    this.events = { success: {}, fail: {} };
    this.container = document.body;
    this.selector = (typeof selector === 'string') ? selector : '.kopio';
    this.addListeners();
  }

  /**
   * @desc Add event listeners to all selector matches
   */
  addListeners() {
    const self = this;
    document.querySelectorAll(this.selector).forEach((kopio) => {
      kopio.addEventListener('click', event => self.copy(event));
    });
  }

  /**
   * @desc Creates a temp element and copies its contents
   * @param {Event} - Click event
   */
  copy({ target, originalTarget }) {
    const trigger = target || originalTarget;
    const tempText = trigger.getAttribute('data-kopio-text');
    const tempEl = document.createElement('div');
    tempEl.appendChild(document.createTextNode(tempText));
    this.container.appendChild(tempEl);
    const range = document.createRange();
    range.selectNodeContents(tempEl);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    const result = document.execCommand('copy');
    tempEl.remove();
    if (result) {
      this.emit('success', trigger);
    } else {
      this.emit('error', trigger);
    }
  }

  /**
   * @desc Emits events
   * @param {string} eventName
   * @param {Node} trigger
   */
  emit(eventName, trigger) {
    const event = this.events[eventName];
    if (event) {
      event.call(null, trigger);
    }
  }

  /**
   * @desc Subscribe to events
   * @param {string} eventName - Can be 'success' or 'error'
   * @param {Function} callback
   */
  on(eventName, callback) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName] = callback;
  }
}
