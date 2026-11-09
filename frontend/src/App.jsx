import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Jogo from './pages/Jogo'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Jogo />} />
        <Route path="/jogo" element={<Jogo />} />
        <Route path="*" element={<Jogo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
