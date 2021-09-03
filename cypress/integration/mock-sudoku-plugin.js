/// <reference types="cypress" />

import initialBoard from '../fixtures/init-array.json'
import solvedBoard from '../fixtures/solved-array.json'
import { mockInBundle, injectFn } from 'mock-in-bundle'

import { checkBoardMocked } from './utils'

describe('Sudoku', () => {
  it('mocks the board by injecting a stub', () => {
    mockInBundle(
      '/solver/UniqueSudoku.js',
      {
        getUniqueSudoku: injectFn(() => [initialBoard, solvedBoard]),
      },
      'main.chunk.js',
    )
    cy.visit('/')
    checkBoardMocked()
  })
})
