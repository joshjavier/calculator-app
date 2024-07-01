/**
 * Returns the number of pixels from the left of the page to the left edge of the element
 * @param {HTMLElement} element
 * @returns {number}
 */
export function getOffsetLeft(element) {
  if (!element) return 0
  return getOffsetLeft(element.offsetParent) + element.offsetLeft
}

/**
 * Returns the x coordinate of the pointer relative to the element
 * @param {number} clientX
 * @param {HTMLElement} element
 * @returns {number}
 */
export function getInnerX(clientX, element) {
  return Math.floor(clientX - getOffsetLeft(element))
}

/**
 * Returns the size of the element including margin in pixels
 * @returns {number}
 */
export function getSize(element) {
  const margin = parseInt(getComputedStyle(element).margin)
  return element.clientWidth + (margin * 2)
}
