import Grid from './components/Grid'
import Controls from './components/Controls'
import { GameProvider } from './context'

const App = () => (
  <GameProvider>
    <Grid />
    <Controls />
  </GameProvider>
)

export default App
