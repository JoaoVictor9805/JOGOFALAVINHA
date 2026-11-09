import { motion } from 'framer-motion'
import ProgressTrack from './ProgressTrack'
import Cronometro from './Cronometro'

function StageTruss({ currentCheckpoint = 0, isAnimating = false, isWrong = false, totalCheckpoints = 7, tempo = 0 }) {
  return (
    <header className="stage-truss-header">
      {/* Estrutura metálica de fundo com padrão de treliça */}
      <div className="truss-beam-frame">
        <svg className="truss-svg-pattern" preserveAspectRatio="none" viewBox="0 0 1200 40">
          <defs>
            <pattern id="trussPattern" width="30" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="5" x2="30" y2="5" stroke="#475569" strokeWidth="2" />
              <line x1="0" y1="35" x2="30" y2="35" stroke="#475569" strokeWidth="2" />
              <line x1="0" y1="5" x2="15" y2="35" stroke="#334155" strokeWidth="1.5" />
              <line x1="15" y1="35" x2="30" y2="5" stroke="#334155" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="40" fill="url(#trussPattern)" />
        </svg>

        {/* Refletores de Palco pendurados na treliça */}
        <div className="stage-spotlights">
          <div className="spotlight-fixture fixture-left-1" />
          <div className="spotlight-fixture fixture-left-2" />
          <div className="spotlight-fixture fixture-right-1" />
          <div className="spotlight-fixture fixture-right-2" />
        </div>
      </div>

      {/* Conteúdo da Barra Superior: Logotipo discreto / Track Central / Cronômetro */}
      <div className="truss-content-container">
        {/* Track de Progresso Central com o corredor e checkpoints */}
        <div className="truss-track-container">
          <ProgressTrack
            currentCheckpoint={currentCheckpoint}
            isAnimating={isAnimating}
            isWrong={isWrong}
            totalCheckpoints={totalCheckpoints}
          />
        </div>

        {/* Display do Cronômetro Estilo Game Show */}
        <div className="truss-timer-container">
          <div className="gameshow-timer-badge">
            <span className="timer-label">TEMPO:</span>
            <Cronometro tempo={tempo} isRunning={true} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default StageTruss

