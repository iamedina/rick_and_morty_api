import './App.css'
import Menu from './components/Header'
import Inicio from './components/Main'
import Contenido from './components/Section'
import Creditos from './components/Footer'

function App() {

  return (
    <>
      <div id='container'>
        <Menu />
        <Inicio />
        <Contenido />
        <Creditos />
      </div>
    </>
  )
}

export default App
