/// <reference types="cypress" />

import { replaceWebPackModule, checkBoardMocked } from './utils'

describe('Sudoku', () => {
  it('mocks the board inline', () => {
    // have to use the actual values in the mock function
    // because it will be evaluated via text
    replaceWebPackModule('/solver/UniqueSudoku.js', {
      getUniqueSudoku: () => [
        [
          '0',
          '0',
          '9',
          '0',
          '2',
          '0',
          '0',
          '0',
          '5',
          '0',
          '1',
          '4',
          '0',
          '0',
          '0',
          '0',
          '8',
          '2',
          '2',
          '8',
          '3',
          '4',
          '1',
          '5',
          '0',
          '0',
          '9',
          '0',
          '3',
          '1',
          '2',
          '5',
          '4',
          '0',
          '0',
          '7',
          '7',
          '4',
          '2',
          '0',
          '9',
          '0',
          '8',
          '5',
          '3',
          '9',
          '6',
          '0',
          '0',
          '7',
          '0',
          '2',
          '0',
          '0',
          '3',
          '9',
          '8',
          '0',
          '0',
          '2',
          '5',
          '7',
          '6',
          '1',
          '2',
          '0',
          '0',
          '8',
          '0',
          '0',
          '3',
          '0',
          '4',
          '0',
          '6',
          '0',
          '0',
          '7',
          '0',
          '0',
          '0',
        ],
        [
          '6',
          '7',
          '9',
          '3',
          '2',
          '8',
          '4',
          '1',
          '5',
          '5',
          '1',
          '4',
          '7',
          '6',
          '9',
          '3',
          '8',
          '2',
          '2',
          '8',
          '3',
          '4',
          '1',
          '5',
          '7',
          '6',
          '9',
          '8',
          '3',
          '1',
          '2',
          '5',
          '4',
          '6',
          '9',
          '7',
          '7',
          '4',
          '2',
          '6',
          '9',
          '1',
          '8',
          '5',
          '3',
          '9',
          '6',
          '5',
          '8',
          '7',
          '3',
          '2',
          '4',
          '1',
          '3',
          '9',
          '8',
          '1',
          '4',
          '2',
          '5',
          '7',
          '6',
          '1',
          '2',
          '7',
          '5',
          '8',
          '6',
          '9',
          '3',
          '4',
          '4',
          '5',
          '6',
          '9',
          '3',
          '7',
          '1',
          '2',
          '8',
        ],
      ],
    })
    cy.visit('/')
    checkBoardMocked()
  })
})
