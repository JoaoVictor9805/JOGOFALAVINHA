import { motion } from 'framer-motion'

const TOTAL_CHECKPOINTS = 7

function ProgressTrack({
  currentCheckpoint = 0,
  isAnimating = false,
  isWrong = false,
  totalCheckpoints = TOTAL_CHECKPOINTS,
}) {
  const fraction = Math.min(Math.max(currentCheckpoint / totalCheckpoints, 0), 1)

  return (
    <div className="truss-track-wrapper">
      {/* Barra metálica horizontal onde o corredor corre */}
      <div className="truss-rail-bar">
        <motion.div
          className="truss-rail-progress"
          initial={{ width: 0 }}
          animate={{ width: `${fraction * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </div>

      {/* Personagem Corredor no topo do trilho */}
      <motion.div
        className="truss-runner-node"
        animate={{
          left: `calc(16px + (100% - 32px) * ${fraction} - 16px)`,
          rotate: isWrong ? [0, -15, 15, -10, 10, 0] : 0,
        }}
        transition={{
          left: { duration: 0.8, ease: 'easeInOut' },
          rotate: { duration: 0.4, repeat: isWrong ? 2 : 0 },
        }}
      >
        <div className="pixel-runner-sprite">
          {/* Cabeça e Cabelo */}
          <div className="p-runner-hair" />
          <div className="p-runner-head" />
          {/* Tronco */}
          <div className="p-runner-shirt" />
          {/* Pernas em movimento */}
          <motion.div
            className="p-runner-legs"
            animate={{ y: isAnimating ? [-2, 0, -2] : 0 }}
            transition={{ duration: 0.2, repeat: isAnimating ? Infinity : 0 }}
          />
        </div>
      </motion.div>

      {/* Bandeiras de Checkpoints na Treliça */}
      <div className="truss-flags-row">
        {Array.from({ length: totalCheckpoints + 1 }, (_, i) => {
          const isPassed = i <= currentCheckpoint
          const isCurrent = i === currentCheckpoint
          const isFinal = i === totalCheckpoints

          return (
            <div key={i} className="truss-flag-item">
              {isFinal ? (
                // Bandeira Quadriculada de Chegada
                <div
                  className={`flag-banner flag-checkered ${isPassed ? 'banner-active-finish' : 'banner-inactive'
                    }`}
                  title="Linha de Chegada"
                >
                  <div className="checkered-pattern" />
                </div>
              ) : (
                // Bandeiras 1 a 7
                <div
                  className={`flag-banner ${isPassed ? 'banner-passed' : 'banner-future'
                    } ${isCurrent ? 'banner-current' : ''}`}
                >
                  <span className="flag-number">{i + 1}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressTrack
