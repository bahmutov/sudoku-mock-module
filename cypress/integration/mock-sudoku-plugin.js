/// <reference types="cypress" />

import initialBoard from '../fixtures/init-array.json'
import solvedBoard from '../fixtures/solved-array.json'
import { mockInBundle, injectFn } from 'mock-in-bundle'

import { checkBoardMocked } from './utils'

describe('Sudoku', () => {
  it('mocks the board by passing a function', () => {
    mockInBundle(
      '/solver/UniqueSudoku.js',
      {
        getUniqueSudoku: () => [initialBoard, solvedBoard],
      },
      'main.chunk.js',
    )
    cy.visit('/')
    checkBoardMocked()
  })

  it('mocks the board by passing a cy.stub', () => {
    const getUniqueSudoku = cy.stub().returns([initialBoard, solvedBoard])
    mockInBundle(
      '/solver/UniqueSudoku.js',
      {
        getUniqueSudoku,
      },
      'main.chunk.js',
    )
    cy.visit('/')
    checkBoardMocked().then(() => {
      expect(getUniqueSudoku).to.be.calledOnceWith('Easy')
    })
  })

  it('mocks the board by passing a cy.stub with an alias', () => {
    mockInBundle(
      '/solver/UniqueSudoku.js',
      {
        getUniqueSudoku: cy
          .stub()
          .returns([initialBoard, solvedBoard])
          .as('board'),
      },
      'main.chunk.js',
    )
    cy.visit('/')
    cy.get('@board').should('have.been.calledOnceWith', 'Easy')
    checkBoardMocked()
  })

  it('mocks the board by injecting a stub', () => {
    mockInBundle(
      '/solver/UniqueSudoku.js',
      {
        // no worries if call injectFn
        getUniqueSudoku: injectFn(() => [initialBoard, solvedBoard]),
      },
      'main.chunk.js',
    )
    cy.visit('/')
    checkBoardMocked()
  })
})
