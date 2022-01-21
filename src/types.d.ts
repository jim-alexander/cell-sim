export interface IGameContext {
  cells: ICell[]
  rows: number
  columns: number
  reset: (random?: boolean) => void
  generation: () => void
  toggleCell: (cell: ICell) => void
}

export interface ICell {
  id: string
  x: number
  y: number
  alive: boolean
}
