import ArrowDown from "./components/ArrowDown/ArrowDown"
import Btn from "./components/Btn/Btn"
import Dots from "./components/Dots/Dots"
import Header from "./components/Header/Header"
import Lines from "./components/Lines/Lines"
import ParticlesCanvas from "./components/Particle/ParticlesCanvas"
import Title from "./components/Title/Title"

function App() {

  return (
    <div className='App'>
      <div className='App_hero'>
        <Lines /> 
        {/* <Dots /> */}
        {/* Просте зображення точок */}
        <Header />
        <ParticlesCanvas />
        {/* Канвас з точками */}
        <Btn title={'START TODAY!'} />
      </div>
      <div className='App_content'>
        <div className='container App_content_container'>
          <Title text={<>Building the future of <br /> medicine with AI</>} />
          <div className='App_content_scroll'>
            <ArrowDown />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
