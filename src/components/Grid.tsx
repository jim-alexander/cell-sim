import React from 'react'
import { useGameContext } from '../context'
import Cell from './Cell'

const Grid: React.FC = () => {
  const { cells, columns } = useGameContext()

  return (
    <div id='grid-container' style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }} data-testid='grid'>
      {cells.map((cell, index) => (
        <Cell key={index} {...cell} />
      ))}
    </div>
  )
}

export default Grid
