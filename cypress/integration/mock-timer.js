/// <reference types="cypress" />
import React from 'react'
import { mockInBundle, injectFn } from 'mock-in-bundle'

describe('Sudoku', () => {
  it('mocks the timer component', () => {
    mockInBundle(
      '/components/Timer.js',
      {
        Timer: injectFn(() => <div className="status__time">TIME</div>),
      },
      'main.chunk.js',
    )
    cy.visit('/')
  })
})
