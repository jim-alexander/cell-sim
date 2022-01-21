import React from 'react'
import { useImmer } from 'use-immer'
import { generateBlankCells, findNeighbors } from './utilities'
import type { ICell, IGameContext } from './types'

const initialState = {
  cells: [],
  rows: 0,
  columns: 0,
  reset: () => null,
  generation: () => null,
  toggleCell: () => null,
}

const gameContext = React.createContext<IGameContext>(initialState)

export const GameProvider: React.FC = ({ children }) => {
  const [rows] = React.useState(25)
  const [columns] = React.useState(40)
  const [cells, setCells] = useImmer<ICell[]>([])

  React.useEffect(() => {
    reset()
  }, [])

  const reset = (random = false) => setCells(generateBlankCells(rows, columns, random))

  const generation = () => {
    setCells((draft) => {
      for (const cell of draft) {
        // There are more performant ways of finding neighbors of a cell
        // EG: determining the index instead of looping (2d array set up and calculating the remainder %)
        const neighbors = findNeighbors(cells, cell, rows, columns)

        // A cell with fewer than two live neighbors dies of under-population.
        if (neighbors.length < 2) cell.alive = false

        // A live cell with 2 or 3 live neighbors lives on to the next generation.
        // Redundant Condition
        // if (cell.alive && (neighbors.length === 2 || neighbors.length === 3)) cell.alive = true

        // A cell with more than 3 live neighbors dies of overcrowding.
        if (neighbors.length > 3) cell.alive = false

        // An empty Cell with exactly 3 live neighbors "comes to life".
        if (neighbors.length === 3) cell.alive = true

        // A Cell who "comes to life" outside the board should wrap at the other side of the board.
        // Acknowledgement:
        // Due to the nature of how the neighbors are "detected" for a given cell this isn't technically how it works here.
        // The expected outcome is still achieved by assuming that if a cell is at an edge (0, rows, or columns, then the
        // neighboring cell will be at the opposing edge)
      }
    })
  }

  const toggleCell = (cell: ICell) =>
    setCells((draft) => {
      const index = cells.findIndex((c) => c.id === cell.id)
      draft[index].alive = !draft[index].alive
    })

  return (
    <gameContext.Provider value={{ cells, rows, columns, reset, generation, toggleCell }}>
      {children}
    </gameContext.Provider>
  )
}

export const useGameContext = () => React.useContext(gameContext)
