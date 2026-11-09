import { motion } from 'framer-motion'

function CharacterAvatar({ state = 'idle' }) {
  const mouthPaths = {
    idle: 'M12 18v5M12 18h.01',
    correct: 'M12 18v5M12 18h.01zM8 21l2 4 4-6-4-6z',
    wrong: 'M12 18v5M12 18h.01zM4 21l8-3L4 3z',
  }

  const eyeTransforms = {
    idle: 'translate(0 0) scale(0.3)',
    correct: 'translate(-8 -3) scale(0.35)',
    wrong: 'translate(-8 3) scale(0.25)',
  }

  const leftArmRotations = {
    idle: -25,
    correct: 80,
    wrong: -80,
  }

  const rightArmRotations = {
    idle: 25,
    correct: -80,
    wrong: 80,
  }

  return (
    <div className="avatar-card">
      <svg viewBox="0 0 120 100" className="avatar-svg">
        {/* Cabeça */}
        <circle cx="60" cy="50" r="45" fill="#145F5E" stroke="#1E8280" strokeWidth="3" />

        {/* Olhos */}
        <g transform={eyeTransforms[state] || eyeTransforms.idle}>
          <circle cx="-25" cy="-10" r="12" fill="#FFFFFF" stroke="#1E8280" strokeWidth="2" />
          <circle cx="25" cy="-10" r="12" fill="#FFFFFF" stroke="#1E8280" strokeWidth="2" />
          <circle cx="-25" cy="-10" r="8" fill="#145F5E" />
          <circle cx="25" cy="-10" r="8" fill="#145F5E" />
        </g>

        {/* Boca */}
        <path
          d={mouthPaths[state] || mouthPaths.idle}
          fill="#FFFFFF"
          stroke="#1E8280"
          strokeWidth="2"
        />

        {/* Nariz */}
        <circle cx="60" cy="52" r="3" fill="#1E8280" />

        {/* Bochechas coradas no acerto */}
        {state === 'correct' && (
          <>
            <circle cx="35" cy="48" r="4" fill="#10B981" opacity="0.5" />
            <circle cx="85" cy="48" r="4" fill="#10B981" opacity="0.5" />
          </>
        )}

        {/* Gota de suor no erro */}
        {state === 'wrong' && (
          <path
            d="M70 55c0 2-2 4-4 4s-4-2-4-4v-2c0-2 2-4 4-4h6c2 0 4 2 4 4z"
            fill="#FF5A5F"
            opacity="0.6"
          />
        )}

        {/* Braço Esquerdo */}
        <g transform={`translate(20, 40) rotate(${leftArmRotations[state] || 0})`}>
          <path
            d="M0 0 C10 20, 30 20, 40 0 L40 -5 Z"
            fill="#1E8280"
            stroke="#145F5E"
            strokeWidth="2"
          />
        </g>

        {/* Braço Direito */}
        <g transform={`translate(95, 55) rotate(${rightArmRotations[state] || 0})`}>
          <path
            d="M0 0 C-10 20, -30 20, -40 0 L-40 -5 Z"
            fill="#1E8280"
            stroke="#145F5E"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  )
}

export default CharacterAvatar

