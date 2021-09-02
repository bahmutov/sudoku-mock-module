/// <reference types="cypress" />

import initialBoard from '../fixtures/init-array.json'
import solvedBoard from '../fixtures/solved-array.json'

import { replaceWebPackModule, checkBoardMocked } from './utils'

describe('Sudoku', () => {
  it('mocks the board by preparing the function as a string', () => {
    const getUniqueSudoku = new Function(`
      return [
        ${JSON.stringify(initialBoard)},
        ${JSON.stringify(solvedBoard)}
      ]
    `)

    replaceWebPackModule('/solver/UniqueSudoku.js', null, {
      getUniqueSudoku,
    })
    cy.visit('/')
    checkBoardMocked()
  })

  it('mocks the board by passing a function reference', () => {
    cy.on('window:before:load', (win) => {
      win.__getUniqueSudoku = () => [initialBoard, solvedBoard]
    })

    replaceWebPackModule('/solver/UniqueSudoku.js', null, {
      getUniqueSudoku: 'window.__getUniqueSudoku',
    })
    cy.visit('/')
    checkBoardMocked()
  })

  it('mocks the board by passing a cy stub', () => {
    cy.on('window:before:load', (win) => {
      win.__getUniqueSudoku = cy
        .stub()
        .returns([initialBoard, solvedBoard])
        .as('getUniqueSudoku')
    })

    replaceWebPackModule('/solver/UniqueSudoku.js', null, {
      getUniqueSudoku: 'window.__getUniqueSudoku',
    })
    cy.visit('/')
    // confirm the game has called the mock function
    cy.get('@getUniqueSudoku').should('have.been.calledWith', 'Easy')
    checkBoardMocked()
  })

  it('without any mocks', () => {
    cy.visit('/')
  })
})
