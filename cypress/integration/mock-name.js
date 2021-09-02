/// <reference types="cypress" />

import { replaceWebPackModule } from './utils'
// we need both the default and the named exports
import * as nameMock from '../fixtures/joe'

describe('Mocking module exports', () => {
  it('logs the real exports', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'log').as('log')
      },
    })
    cy.get('@log')
      .should('have.been.calledWith', 'Name is', 'Foo')
      .and('have.been.calledWith', 'age 21')
  })

  it('logs a different name after mocking the default export', () => {
    replaceWebPackModule('Name.js', { default: 'Joe' }, 'main.chunk.js')
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'log').as('log')
      },
    })
    cy.get('@log').should('have.been.calledWith', 'Name is', 'Joe')
  })

  it('mocks the default and the named exports', () => {
    replaceWebPackModule('src/Name.js', { default: 'Joe', age: 99 })
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'log').as('log')
      },
    })
    cy.get('@log')
      .should('have.been.calledWith', 'Name is', 'Joe')
      .and('have.been.calledWith', 'age 99')
  })

  it('mocks named function expression', () => {
    // NOTE: only overrides a single named export
    // if you have other exports that are used, must override them too
    replaceWebPackModule('src/Name.js', { getName: () => 'Mary' })
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'log').as('log')
      },
    })
    cy.get('@log').should('have.been.calledWith', 'getName returns Mary')
  })

  it('mocks several exports', () => {
    replaceWebPackModule('src/Name.js', {
      default: 'Olaf',
      age: 10,
      getName: () => 'Olaf',
    })
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'log').as('log')
      },
    })
    cy.get('@log')
      .should('have.been.calledWith', 'Name is', 'Olaf')
      .and('have.been.calledWith', 'age 10')
      .and('have.been.calledWith', 'getName returns Olaf')
  })

  it('mocks named function expression with a cy stub', () => {
    // prepare a stub for the getName export
    const getNameStub = cy.stub().returns('Alice').as('getMockName')
    replaceWebPackModule('src/Name.js', {
      getName: 'window.getMockName',
    })
    cy.visit('/', {
      onBeforeLoad(win) {
        // put the getName stub on the window
        // so that the application calls it
        // when it uses the window.getName export
        win.getMockName = getNameStub
        cy.spy(win.console, 'log').as('log')
      },
    })
    // confirm our mocking stub worked
    cy.get('@getMockName').should('have.been.calledOnce')
    cy.get('@log').should('have.been.calledWith', 'getName returns Alice')
  })

  it('mocks module using import from JS', () => {
    replaceWebPackModule('src/Name.js', nameMock, 'main.chunk.js')

    cy.on('window:before:load', (win) => {
      cy.spy(win.console, 'log').as('log')
    })

    cy.visit('/')

    cy.get('@log')
      .should('have.been.calledWith', 'Name is', 'Adam')
      .and('have.been.calledWith', 'age 8')
      .and('have.been.calledWith', 'getName returns Leo')
  })
})
