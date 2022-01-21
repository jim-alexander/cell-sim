import { useGameContext } from '../context'

const Controls = () => {
  const { reset, generation, cells } = useGameContext()

  const disableGenerationBtn = !cells.find((i) => i.alive)

  return (
    <div id='control-container'>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => reset(true)}>Randomise</button>
      <button onClick={generation} disabled={disableGenerationBtn}>
        Next Generation
      </button>
    </div>
  )
}
export default Controls
