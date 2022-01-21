import type { ICell } from './types'

export const generateBlankCells = (rows: number, columns: number, random = false) => {
  const blankCells: ICell[] = []
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      const alive = random ? Math.random() > 0.9 : false
      const id = `${x}.${y}`
      blankCells.push({ id, x, y, alive })
    }
  }
  return blankCells
}

export const findNeighbors = (cells: ICell[], cell: ICell, rows: number, columns: number) => {
  const { x: cx, y: cy } = cell
  const maxRow = rows - 1
  const maxCol = columns - 1
  return cells.filter((compareCell) => {
    // Only alive cells are relevant
    if (!compareCell.alive) return false

    const { x: nx, y: ny } = compareCell

    // Can't be a neighbor to itself
    if (cx === nx && cy === ny) return false

    // IMPORTANT
    // Conditions that reference (0 | maxRow | maxCol) are used for edge wrapping

    // Horizontal Match
    if (cx === nx) {
      if (cy + 1 === ny || cy - 1 === ny) return true
      if ((cy === maxCol && ny === 0) || (cy === 0 && ny === maxCol)) return true
    }

    // Vertical Match
    if (cy === ny) {
      if (cx + 1 === nx || cx - 1 === nx) return true
      if ((cx === maxRow && nx === 0) || (cx === 0 && nx === maxRow)) return true
    }

    // Diagonal Match
    if (cx - 1 === nx || cx + 1 === nx || (cx === 0 && nx === maxRow) || (cx === maxRow && nx === 0)) {
      if (cy + 1 === ny || cy - 1 === ny || (cy === 0 && ny === maxCol) || (cy === maxCol && ny === 0)) {
        return true
      }
    }

    // No Match
    else return false

    // NOTE: Could refactor and use more meaningful condition names for readability, for Example:
    // const left = nx === cx && (ny === cy - 1 || (cy === maxCol && ny === 0))
    // if (isLeft || isRight ...) return true
  })
}
