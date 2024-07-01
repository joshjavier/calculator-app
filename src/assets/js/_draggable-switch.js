import { getInnerX, getSize } from "./_utils"

export default class DraggableSwitch {
  /** @type {HTMLFormElement} switch - The switch element */
  switch
  /** @type {HTMLElement} track - The switch track element */
  track
  /** @type {HTMLElement} handle - The switch handle element */
  handle
  /** @type {boolean} handlePressed - True when the switch handle is pressed */
  handlePressed
  /** @type {number[]} thresholds - Array of pixel offsets of each option relative to the track */
  thresholds
  /** @type {number} min - Alias for the first item in the thresholds array */
  min
  /** @type {number} max - Alias for the last item in the thresholds array */
  max

  /** @param {string} selector */
  constructor(selector) {
    this.switch = document.querySelector(selector)
    this.track = this.switch.querySelector('.track')
    this.handle = this.switch.querySelector('.track svg')
    this.thresholds = [...this.switch.elements['theme']].map(radio => radio.offsetLeft)
    this.min = this.thresholds[0]
    this.max = this.thresholds[this.thresholds.length - 1]

    this.pressHandle = this.pressHandle.bind(this)
    this.dragHandle = this.dragHandle.bind(this)
    this.releaseHandle = this.releaseHandle.bind(this)

    this.track.addEventListener('pointerdown', this.pressHandle)
  }

  /** @param {PointerEvent} event */
  pressHandle(event) {
    this.handlePressed = event.target !== this.track && event.target.type !== 'radio'

    document.addEventListener('pointermove', this.dragHandle)
    document.addEventListener('pointerup', this.releaseHandle, { once: true })
    document.addEventListener('pointercancel', this.releaseHandle, { once: true })
  }

  /** @param {PointerEvent} event */
  dragHandle(event) {
    if (!this.handlePressed) return

    let x = getInnerX(event.clientX, this.track)
    let pos = x - (getSize(this.handle) / 2)
    if (pos < this.min) pos = this.min
    if (pos > this.max) pos = this.max

    this.handle.style.setProperty('transition-duration', '0s')
    this.handle.style.setProperty('--handle-position', pos + 'px')
  }

  /** @param {PointerEvent} event */
  releaseHandle(event) {
    if (!this.handlePressed) return

    this.handlePressed = false
    this.snapToOption(getInnerX(event.clientX, this.track))
    this.handle.removeAttribute('style')

    // Cleanup
    document.removeEventListener('pointermove', this.dragHandle)
    if (event.type === 'pointerup') document.removeEventListener('pointercancel', this.releaseHandle)
    if (event.type === 'pointercancel') document.removeEventListener('pointerup', this.releaseHandle)

  }

  /**
   * Snap the handle to the option closest to the x coordinate
   * @param {number} x
   */
  snapToOption(x) {
    for (let i = this.thresholds.length - 1; i >= 0; i--) {
      if (x > this.thresholds[i] || i === 0) {
        this.switch.elements['theme'][i].click()
        return
      }
    }
  }
}
