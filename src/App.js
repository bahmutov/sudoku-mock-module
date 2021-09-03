import React from 'react'
import { Game } from './Game'
import './App.css'
import { SudokuProvider } from './context/SudokuContext'
import Name, { age, getName } from './Name'
import { VERSION, uniqueId } from 'lodash'

console.log('Name is', Name)
console.log(`age ${age}`)
console.log(`getName returns ${getName ? getName() : ''}`)

console.log('Lodash imports')
console.log('VERSION', VERSION)
console.log('uniqueId', uniqueId('user_'))

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
