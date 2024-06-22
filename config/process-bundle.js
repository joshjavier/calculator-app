import browserslist from "browserslist"
import { transform, browserslistToTargets } from "lightningcss"

const targets = browserslistToTargets(browserslist())

/** @param {string} content  */
export default async function (content) {
  if (this.type === 'css') {
    let result = transform({
      code: Buffer.from(content),
      minify: true,
      targets
    })
    return result.code
  }

  if (this.type === 'js') {
    // process js
    return content
  }
}
