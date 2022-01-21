import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { GameProvider } from './context'

import App from './App'

const renderWithProvider = (component: React.ReactElement) => render(component, { wrapper: GameProvider })

describe('Grid setup', () => {
  it('should establish a grid with 40 columns', () => {
    renderWithProvider(<App />)
    const grid = screen.getByTestId('grid')
    expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(40, 1fr)' })
  })

  it('should render 1000 dead cells', () => {
    renderWithProvider(<App />)
    const cells = screen.getAllByTestId('cell')
    expect(cells.length).toBe(1000)
    for (const cell of cells) {
      expect(cell).toHaveClass('cell', 'dead')
    }
  })
})

describe('Controls', () => {
  it('should click a dead cell to give it life', () => {
    renderWithProvider(<App />)
    const initialCells = screen.getAllByTestId('cell')
    userEvent.click(initialCells[1])
    expect(initialCells[1]).toHaveClass('cell', 'alive')
  })

  it('should have a button that resets to the initial state', () => {
    renderWithProvider(<App />)

    // Click on a cell
    const initialCells = screen.getAllByTestId('cell')
    userEvent.click(initialCells[1])
    expect(initialCells[1]).toHaveClass('cell', 'alive')

    // Click Reset
    const resetButton = screen.getByRole('button', { name: /reset/i })
    userEvent.click(resetButton)

    // Ensure all cells are dead
    const updatedCells = screen.getAllByTestId('cell')
    for (const cell of updatedCells) {
      expect(cell).toHaveClass('cell', 'dead')
    }
  })

  it('should have a button that triggers a generation sequence', () => {
    renderWithProvider(<App />)

    const cells = screen.getAllByTestId('cell')

    // This test covers the provided demo progression sequence (images)
    const sequence = [
      [298, 339, 377, 378, 379], // Setup
      [337, 339, 378, 379, 418], // Gen 1
      [339, 377, 379, 418, 419], // Gen 2
      [338, 379, 380, 418, 419], // Gen 3
      [339, 380, 418, 419, 420], // Gen 4
    ]

    // Click on cells to setup sequence
    for (const index of sequence[0]) userEvent.click(cells[index])

    // Click through generations
    const generationButton = screen.getByRole('button', { name: /generation/i })

    const checkSequence = (sequenceIndex: number) => {
      for (const [index, HTMLElement] of Object.entries(cells)) {
        // Ensure cells that are meant to be alive are alive
        if (sequence[sequenceIndex].includes(Number(index))) expect(HTMLElement).toHaveClass('alive')
        // Ensure cells that are meant to be dead are dead
        else expect(HTMLElement).toHaveClass('dead')
      }
    }

    // Gen 1
    userEvent.click(generationButton)
    checkSequence(1)

    // Gen 2
    userEvent.click(generationButton)
    checkSequence(2)

    // Gen 3
    userEvent.click(generationButton)
    checkSequence(3)

    // Gen 4
    userEvent.click(generationButton)
    checkSequence(4)
  })
})
