/// <reference types="cypress" />

import initialBoard from '../fixtures/init-array.json'

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
      if (k === -1) {
        // could not the module in the script
        return
      }
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

/**
 * Confirms the first cells in the game are filled
 * with the initial values from the mock board array.
 */
export const checkBoardMocked = () => {
  cy.get('.game__cell').should('have.length', initialBoard.length)
  // take the first N items from the array
  // and check the cells on the board
  Cypress._.slice(initialBoard, 0, 3).forEach((value, index) => {
    cy.get('.game__cell').eq(index).should('have.text', value)
  })
}
