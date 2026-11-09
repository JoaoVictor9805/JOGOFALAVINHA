import Cronometro from './Cronometro'

function Header({ tempo = 0, isRunning = true }) {
  return (
    <header className="game-header">
      <div className="header-brand">
        <span className="brand-title">FALAVINHA NEXT</span>
        <span className="brand-divider">|</span>
        <span className="brand-subtitle">Escape Room</span>
      </div>

      <div className="header-right">
        <Cronometro tempo={tempo} isRunning={isRunning} />
      </div>
    </header>
  )
}

export default Header
