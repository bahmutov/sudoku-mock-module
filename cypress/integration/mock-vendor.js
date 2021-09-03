/// <reference types="cypress" />
import { mockInBundle } from 'mock-in-bundle'

describe('Sudoku', () => {
  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      cy.spy(win.console, 'log').as('log')
    })
  })

  it('original vendor imports from Lodash', () => {
    cy.visit('/')
    cy.get('@log').should('have.been.calledWith', 'uniqueId', 'user_1')
  })

  it('mocks vendor imports from Lodash', () => {
    // be careful - the entire module is mocked
    // for everyone in the app
    mockInBundle(
      '/lodash.js',
      {
        VERSION: '"vMocked"',
        uniqueId: () => 'user_mock_1',
      },
      '0.chunk.js',
    )
    cy.visit('/')
    cy.get('@log').should('have.been.calledWith', 'VERSION', 'vMocked')
    cy.get('@log').should('have.been.calledWith', 'uniqueId', 'user_mock_1')
  })
})
