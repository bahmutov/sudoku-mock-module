/// <reference types="cypress" />
// @ts-check

import initialBoard from '../fixtures/init-array.json'

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

  return cy
}
