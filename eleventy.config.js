import esbuild from "./config/esbuild.js"
import lightningcss from "./config/lightningcss.js"
import eleventyWebcPlugin from "@11ty/eleventy-plugin-webc"
import processBundle from "./config/process-bundle.js"

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets/images')
  eleventyConfig.addPassthroughCopy('src/assets/fonts')

  eleventyConfig.addPlugin(esbuild)
  eleventyConfig.addPlugin(lightningcss)
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: 'src/_components/**/*.webc',
    bundlePluginOptions: {
      transforms: [processBundle]
    }
  })

  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  }
}
