/// <reference types="cypress" />

function _styleTag(style) {
  return `<style>${style}</style>`
}

function _replaceStyle($head, existingStyle, style) {
  const styleTag = _styleTag(style)

  if (existingStyle) {
    Cypress.$(existingStyle).replaceWith(styleTag)
  } else {
    // no existing style at this index, so no more styles at all in
    // the head, so just append it
    $head.append(styleTag)
  }
}

// https://docs.cypress.io/api/cypress-api/custom-commands#Dual-Commands
Cypress.Commands.add(
  'gogh',
  {
    prevSubject: 'optional',
  },
  (subject, name) => {
    const snap = cy.createSnapshot('snap')

    // replace external styles with <style> tags
    // like packages/runner-shared/src/iframe/aut-iframe.js
    const { headStyles } = Cypress.cy.getStyles(snap)
    console.log(headStyles)
    const $head = Cypress.$autIframe.contents().find('head')
    $head.find('script').empty()

    // replace head styles links
    const existingStyles = $head.find('link[rel="stylesheet"],style')
    console.log(existingStyles)

    headStyles.forEach(function (style, index) {
      if (style.href) {
        //?
      } else {
        _replaceStyle($head, existingStyles[index], style)
      }
    })

    const XMLS = new XMLSerializer()
    let s =
      '<html>\n' +
      XMLS.serializeToString(Cypress.$autIframe.contents().find('head')[0]) +
      '\n'
    s += XMLS.serializeToString(snap.body.get()[0]) + '\n</html>\n'
    // what if the test changes the viewport resolution?
    const width = Cypress.config('viewportWidth')
    const height = Cypress.config('viewportHeight')

    if (!name) {
      // probably should warn
      name = 'example.png'
    }
    if (!name.match(/\.png$/)) {
      name += '.png'
    }

    const elementSelector = subject ? subject.selector : null
    cy.task(
      'gogh',
      { html: s, name, width, height, elementSelector },
      { log: false },
    ).then((result) => {
      cy.log(`**gogh:** ${name} ${result.match ? '✅' : '⛔️'}`)
    })

    if (subject) {
      cy.wrap(subject)
    }
  },
)
