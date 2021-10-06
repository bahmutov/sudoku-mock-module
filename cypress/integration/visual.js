/// <reference types="cypress" />

// https://github.com/dmtrKovalenko/cypress-real-events
import 'cypress-real-events/support'
// https://github.com/bahmutov/cyclope
import 'cyclope'

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
    cy.get('.status__action-mistakes-mode-switch').click()
    cy.clope('board.png')
    cy.contains('.status__number', '7')
      .should('be.visible')
      .realHover()
      .cyclope('seven.png')
  })
})
