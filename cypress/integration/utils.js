/// <reference types="cypress" />

export const replaceWebPackModule = (
  fileName,
  newModuleDefault,
  namedExports,
) => {
  cy.intercept('/static/js/main.chunk.js', (req) => {
    // remove caching
    delete req.headers['if-none-match']
    console.log(req.headers)

    req.continue((res) => {
      // make sure not to cache the modified response
      delete res.headers.etag

      const moduleFileName = fileName + '":'
      const k = res.body.indexOf(moduleFileName)
      const insertAt = k + moduleFileName.length
      const start = res.body.substring(0, insertAt)
      const finish = res.body.substring(insertAt)

      let namedExportsCode = ''
      if (namedExports) {
        Object.keys(namedExports).forEach((key) => {
          const value = namedExports[key]
          namedExportsCode += `
            __webpack_require__.d(__webpack_exports__, "${key}", function () { return ${value} });
          `
        })
      }

      let defaultExportCode = ''
      if (newModuleDefault) {
        defaultExportCode = `
          __webpack_exports__['default'] = ${JSON.stringify(newModuleDefault)};
        `
      }

      res.body =
        start +
        `
          (function(module, __webpack_exports__, __webpack_require__) {
            __webpack_require__.r(__webpack_exports__);
            ${namedExportsCode}
            ${defaultExportCode}
          })
          /* add OR to ignore the current module that follows */
          || ` +
        finish
    })
  })
}
