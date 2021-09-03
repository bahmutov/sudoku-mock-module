/// <reference types="cypress" />

import React from 'react'
import initialBoard from '../fixtures/init-array.json'
import solvedBoard from '../fixtures/solved-array.json'
import { mockInBundle } from 'mock-in-bundle'

describe('Sudoku', () => {
  it('without any mocks', () => {
    // mock solver/UniqueSudoku.js returns [initialArray, solvedArray]
    // mockInBundle(
    //   'UniqueSudoku.js',
    //   {
    //     getUniqueSudoku: cy
    //       .stub()
    //       .returns([initialBoard, solvedBoard])
    //       .as('getUniqueSudoku'),
    //   },
    //   'main.chunk.js',
    // )

    mockInBundle(
      'Timer.js',
      {
        Timer: () => <div className="status__time">TIME</div>,
      },
      'main.chunk.js',
    )

    cy.visit('/')
    // cy.get('@getUniqueSudoku').should('have.been.calledOnceWith', 'Easy')
  })
})
