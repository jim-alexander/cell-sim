import React from 'react'
import { useGameContext } from '../context'
import { ICell } from '../types'

const Cell: React.FC<ICell> = (cell) => {
  const { toggleCell } = useGameContext()

  const className = `cell ${cell.alive ? 'alive' : 'dead'}`

  return <div className={className} onClick={() => toggleCell(cell)} data-testid='cell' />
}

export default Cell
