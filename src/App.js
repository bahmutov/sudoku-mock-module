import React from 'react'
import { Game } from './Game'
import './App.css'
import { SudokuProvider } from './context/SudokuContext'
import Name, { age, getName } from './Name'

console.log('Name is', Name)
console.log(`age ${age}`)
console.log(`getName returns ${getName ? getName() : ''}`)

/**
 * App is the root React component.
 */
export const App = () => {
  return (
    <SudokuProvider>
      <Game />
    </SudokuProvider>
  )
}
