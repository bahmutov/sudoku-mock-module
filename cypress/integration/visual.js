/// <reference types="cypress" />
import React from 'react'
import { mockInBundle } from 'mock-in-bundle'
import { checkBoardMocked } from './utils'
import initialBoard from '../fixtures/init-array.json'
import solvedBoard from '../fixtures/solved-array.json'

describe('Sudoku', () => {
  it('mocks Timer and UniqueSudoku', () => {
    mockInBundle(
      {
        'Timer.js': {
          Timer: () => <div className="status__time">TIME</div>,
        },
        'UniqueSudoku.js': {
          getUniqueSudoku: () => [initialBoard, solvedBoard],
        },
      },
      'main.chunk.js',
    )
    cy.visit('/')
    cy.contains('.status__time', 'TIME').should('be.visible')
    checkBoardMocked()
  })
})
