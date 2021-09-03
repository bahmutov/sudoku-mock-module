/// <reference types="cypress" />
import React from 'react'
import { mockInBundle } from 'mock-in-bundle'

describe('Sudoku', () => {
  it('mocks the timer component', () => {
    mockInBundle(
      '/components/Timer.js',
      {
        Timer: () => <div className="status__time">TIME</div>,
      },
      'main.chunk.js',
    )
    cy.visit('/')
    cy.contains('.status__time', 'TIME').should('be.visible')
  })
})
