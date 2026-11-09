import { motion } from 'framer-motion'

function HostPresenter({ state = 'idle', hintText = 'Responda para avançar!', customImage = null }) {
  // Configurações de pose para cada estado
  const armRightVariants = {
    idle: { rotate: 0, transition: { duration: 0.3 } },
    correct: { rotate: -25, y: -6, transition: { duration: 0.3 } },
    wrong: { rotate: 15, y: 4, transition: { duration: 0.3 } },
  }

  return (
    <div className="stage-host-wrapper">
      {/* Balão de Fala do Apresentador */}
      <motion.div
        className="host-speech-bubble"
        key={hintText}
        initial={{ scale: 0.85, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <span className="bubble-speaker">CEO Apresentador</span>
        <p className="bubble-text">{hintText}</p>
        <div className="bubble-arrow" />
      </motion.div>

      {/* Personagem do Apresentador (CEO no Palco) */}
      <motion.div
        className="host-character-container"
        animate={{
          y: state === 'correct' ? [0, -8, 0] : [0, -3, 0],
        }}
        transition={{
          y: {
            duration: state === 'correct' ? 0.4 : 2.5,
            repeat: state === 'correct' ? 2 : Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        {customImage ? (
          <img src={customImage} alt="CEO Apresentador" className="host-custom-img" />
        ) : (
          <svg
            viewBox="0 0 160 260"
            className="host-svg"
            preserveAspectRatio="xMidYMax meet"
          >
            <defs>
              <linearGradient id="suitGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e3a40" />
                <stop offset="50%" stopColor="#142c30" />
                <stop offset="100%" stopColor="#0d1e22" />
              </linearGradient>
              <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5c3826" />
                <stop offset="100%" stopColor="#3d2316" />
              </linearGradient>
              <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffd2b3" />
                <stop offset="100%" stopColor="#e8b28f" />
              </linearGradient>
            </defs>

            {/* Sombra no piso do palco */}
            <ellipse cx="80" cy="254" rx="42" ry="7" fill="#030c0c" opacity="0.6" />

            {/* Pernas e Sapatos Sociais */}
            <rect x="58" y="165" width="18" height="78" rx="4" fill="#142c30" />
            <rect x="84" y="165" width="18" height="78" rx="4" fill="#142c30" />
            <path d="M52 242 h26 v8 c0 3 -4 5 -10 5 h-16 c-4 0 -6 -2 -6 -5 z" fill="#0f172a" />
            <path d="M82 242 h26 v8 c0 3 -4 5 -10 5 h-16 c-4 0 -6 -2 -6 -5 z" fill="#0f172a" />

            {/* Tronco: Terno Corporativo Elegante */}
            <path
              d="M48 95 L112 95 L116 175 L44 175 Z"
              fill="url(#suitGrad)"
              stroke="#2dd4bf"
              strokeWidth="0.8"
            />

            {/* Camisa Branca e Gravata Falavinha (Teal Neon) */}
            <polygon points="70,95 90,95 80,122" fill="#ffffff" />
            {/* Gravata */}
            <polygon points="77,105 83,105 85,150 80,158 75,150" fill="#2dd4bf" />
            {/* Lapelas do Terno */}
            <polygon points="48,95 72,135 68,145 48,105" fill="#1e3a40" />
            <polygon points="112,95 88,135 92,145 112,105" fill="#1e3a40" />

            {/* Braço Esquerdo (Segura as Fichas/Prancheta do Game Show) */}
            <g id="host-left-arm">
              <path
                d="M48 98 C36 120 40 145 52 152"
                stroke="url(#suitGrad)"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              {/* Mão segurando prancheta */}
              <circle cx="56" cy="150" r="7" fill="url(#skinGrad)" />
              {/* Fichas do Apresentador */}
              <g transform="translate(42, 134) rotate(-18)">
                <rect x="0" y="0" width="26" height="34" rx="3" fill="#f8fafc" stroke="#334155" strokeWidth="1.2" />
                <rect x="3" y="4" width="20" height="4" rx="1" fill="#0d9488" />
                <line x1="4" y1="12" x2="22" y2="12" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="4" y1="18" x2="18" y2="18" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="4" y1="24" x2="20" y2="24" stroke="#94a3b8" strokeWidth="1.5" />
              </g>
            </g>

            {/* Braço Direito (Aponta para o Telão / Gesto de Apresentação) */}
            <motion.g
              id="host-right-arm"
              variants={armRightVariants}
              animate={state}
              style={{ originX: '112px', originY: '100px' }}
            >
              <path
                d="M112 100 C128 115 142 125 152 118"
                stroke="url(#suitGrad)"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              {/* Mão apontando aberta para o telão */}
              <g transform="translate(148, 112)">
                <circle cx="5" cy="4" r="6" fill="url(#skinGrad)" />
                <path d="M7 2 L16 -4 L16 -1 L8 6 Z" fill="url(#skinGrad)" />
                <path d="M7 4 L15 1 L15 3 L8 7 Z" fill="url(#skinGrad)" />
              </g>
            </motion.g>

            {/* Pescoço e Cabeça */}
            <rect x="74" y="80" width="12" height="18" fill="url(#skinGrad)" />
            <ellipse cx="80" cy="62" rx="22" ry="24" fill="url(#skinGrad)" />

            {/* Cabelo Estiloso e Penteado do Apresentador */}
            <path
              d="
                M58 58
                C 56 40, 68 28, 86 28
                C 102 28, 108 38, 106 52
                C 104 42, 94 36, 82 38
                C 70 40, 64 48, 62 58
                Z
              "
              fill="url(#hairGrad)"
            />
            {/* Topete / Cabelo com volume */}
            <path
              d="
                M58 55
                C 55 35, 75 24, 92 27
                C 98 28, 104 33, 106 42
                C 101 35, 88 31, 74 37
                Z
              "
              fill="#784732"
            />

            {/* Orelhas */}
            <circle cx="58" cy="62" r="5" fill="url(#skinGrad)" />
            <circle cx="102" cy="62" r="5" fill="url(#skinGrad)" />

            {/* Olhos e Expressão */}
            <g id="host-face">
              {/* Sobrancelhas */}
              {state === 'wrong' ? (
                <>
                  <line x1="68" y1="50" x2="76" y2="54" stroke="#3d2316" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="84" y1="54" x2="92" y2="50" stroke="#3d2316" strokeWidth="2.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="68" y1="52" x2="76" y2="50" stroke="#3d2316" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="84" y1="50" x2="92" y2="52" stroke="#3d2316" strokeWidth="2.5" strokeLinecap="round" />
                </>
              )}

              {/* Olhos expressivos */}
              <ellipse cx="72" cy="58" rx="4" ry="4.5" fill="#1e293b" />
              <ellipse cx="88" cy="58" rx="4" ry="4.5" fill="#1e293b" />
              <circle cx="73" cy="56" r="1.5" fill="#ffffff" />
              <circle cx="89" cy="56" r="1.5" fill="#ffffff" />

              {/* Nariz */}
              <path d="M79 58 L82 66 L77 66" stroke="#c98c69" strokeWidth="1.5" fill="none" strokeLinecap="round" />

              {/* Boca */}
              {state === 'correct' ? (
                // Sorriso aberto e vibrante
                <path d="M70 72 Q80 84 90 72 Z" fill="#ffffff" stroke="#991b1b" strokeWidth="1" />
              ) : state === 'wrong' ? (
                // Boca de "opa, quase!"
                <ellipse cx="80" cy="74" rx="5" ry="4" fill="#475569" />
              ) : (
                // Sorriso confiante de apresentador
                <path d="M72 73 Q80 80 88 73" stroke="#b91c1c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              )}
            </g>
          </svg>
        )}
      </motion.div>

      {/* Palco / Tablado Claro Bege do Apresentador */}
      <div className="character-stage-pedestal" aria-hidden="true">
        <svg viewBox="0 0 170 38" className="pedestal-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hostPedestalBeigeTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#faf5ee" />
              <stop offset="50%" stopColor="#f3eae0" />
              <stop offset="100%" stopColor="#e3d4c0" />
            </linearGradient>
            <linearGradient id="hostPedestalBeigeFront" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cca682" />
              <stop offset="100%" stopColor="#a38568" />
            </linearGradient>
            <linearGradient id="hostPedestalGoldTrim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ca8a04" />
              <stop offset="50%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
          </defs>
          <ellipse cx="85" cy="34" rx="80" ry="4" fill="#000000" opacity="0.45" />
          <path d="M5 14 C5 14 30 28 85 28 C140 28 165 14 165 14 L165 24 C165 31 140 34 85 34 C30 34 5 31 5 24 Z" fill="url(#hostPedestalBeigeFront)" />
          <path d="M5 14 C5 14 30 28 85 28 C140 28 165 14 165 14 L165 17 C165 20 140 30 85 30 C30 30 5 20 5 17 Z" fill="url(#hostPedestalGoldTrim)" opacity="0.9" />
          <ellipse cx="85" cy="14" rx="80" ry="12" fill="url(#hostPedestalBeigeTop)" stroke="#eddcc8" strokeWidth="1.5" />
          <ellipse cx="85" cy="13" rx="55" ry="7" fill="#ffffff" opacity="0.35" />
        </svg>
      </div>
    </div>
  )
}

export default HostPresenter

