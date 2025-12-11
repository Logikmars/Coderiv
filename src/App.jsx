import Header from "./components/Header/Header"
import Lines from "./components/Lines/Lines"
import ParticlesCanvas from "./components/Particle/ParticlesCanvas"

function App() {

  return (
    <div className='App'>
      <Lines /> 
      {/* z: 1 */}
      <Header />
      {/* z: 2 */}
      {/* <ParticlesCanvas /> */}
    </div>
  )
}

export default App
