/// <reference types="cypress" />

const { getConsistentImage } = require('./utils')
const { compare } = require('odiff-bin')
const path = require('path')
const fs = require('fs')

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  if (!process.env.STATIC_IMAGE_SERVER_URL) {
    console.error('Cannot find STATIC_IMAGE_SERVER_URL env variable')
    console.error('Skipping all image generation and comparisons')
  }

  on('task', {
    async gogh({ html, width, height, name, elementSelector }) {
      if (!process.env.STATIC_IMAGE_SERVER_URL) {
        console.log('skipping image: %s', name)
        return null
      }

      console.log('generating image %s', name)

      await getConsistentImage({ html, width, height, name, elementSelector })

      const goldImage = path.join('images', name)
      if (!fs.existsSync(goldImage)) {
        console.log('saving %s as gold 🏆 image %s', name, goldImage)
        fs.copyFileSync(name, goldImage)
        return null
      }

      const diffImage = 'diff-' + name
      console.log('comparing gold image %s with new image', goldImage)
      const { match, reason } = await compare(goldImage, name, diffImage)
      if (match) {
        console.log('odiff says matched ✅')
      } else {
        console.log('odiff says ⛔️: %s', reason)
      }

      return { match, reason }
    },
  })
}
