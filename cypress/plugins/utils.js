const got = require('got')
const fs = require('fs')

// TODO: create folder if needed for the output image
const getConsistentImage = ({ html, width, height, name, elementSelector }) => {
  const url = process.env.STATIC_IMAGE_SERVER_URL
  if (!url) {
    return Promise.reject(new Error('STATIC_IMAGE_SERVER_URL is not defined'))
  }

  return got
    .post(url, {
      json: {
        html,
        width,
        height,
        elementSelector,
      },
    })
    .buffer()
    .then((buf) => fs.writeFileSync(name, buf))
}

module.exports = { getConsistentImage }

// if (!module.parent) {
//   const html = fs.readFileSync('./snap.html', 'utf8')
//   getConsistentImage(html, 500, 300, 'output.png')
// }
