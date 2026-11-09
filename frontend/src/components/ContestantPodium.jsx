import { motion } from 'framer-motion'

function ContestantPodium({
  state = 'idle',
  isBuzzerPressed = false,
  onBuzzerClick,
  playerName = 'Você',
  customAvatar = null,
  skinColor = '#ffd2b3',
  hairColor = '#4a2e1b',
  shirtColor = '#2563eb',
}) {
  return (
    <div className="stage-contestant-wrapper">
      {/* Etiqueta / Crachá flutuante do Jogador */}
      <div className="contestant-tag-badge">
        <span className="contestant-tag-dot" />
        <span className="contestant-tag-name">{playerName}</span>
      </div>

      <div className="contestant-stage-actor">
        {/* Personagem do Jogador (Atrás do Púlpito, de frente) */}
        <motion.div
          className="contestant-character-layer"
          animate={{
            y: state === 'correct' ? [0, -10, 0] : isBuzzerPressed ? [0, 2, 0] : [0, -2, 0],
          }}
          transition={{
            y: {
              duration: state === 'correct' ? 0.35 : 2.8,
              repeat: state === 'correct' ? 2 : Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {customAvatar ? (
            <img src={customAvatar} alt="Jogador" className="contestant-custom-img" />
          ) : (
            <svg
              viewBox="0 0 140 180"
              className="contestant-svg"
              preserveAspectRatio="xMidYMax meet"
            >
              <defs>
                <linearGradient id="podiumContestantSkin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={skinColor} />
                  <stop offset="100%" stopColor="#dca07d" />
                </linearGradient>
                <linearGradient id="podiumContestantShirt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={shirtColor} />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
              </defs>

              {/* Tronco / Moletom ou Camisa */}
              <path
                d="M32 96 L108 96 L118 180 L22 180 Z"
                fill="url(#podiumContestantShirt)"
                stroke="#1d4ed8"
                strokeWidth="1.2"
              />

              {/* Gola da Camisa / Capuz */}
              <path d="M52 96 Q70 114 88 96" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />

              {/* Braços estendidos até a bancada do púlpito */}
              {/* Braço Esquerdo */}
              <path
                d="M32 98 C24 125 38 152 50 162"
                stroke="url(#podiumContestantShirt)"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              {/* Mão Esquerda sobre o púlpito */}
              <circle cx="52" cy="164" r="7" fill="url(#podiumContestantSkin)" />

              {/* Braço Direito em direção ao Buzzer */}
              <motion.path
                d="M108 98 C116 125 96 150 78 158"
                stroke="url(#podiumContestantShirt)"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
                animate={{
                  d: isBuzzerPressed
                    ? 'M108 98 C116 125 94 154 75 162'
                    : 'M108 98 C116 125 96 150 78 158',
                }}
                transition={{ duration: 0.1 }}
              />
              {/* Mão Direita sobre o botão de apertar */}
              <motion.circle
                cx="74"
                cy="158"
                r="7"
                fill="url(#podiumContestantSkin)"
                animate={{ y: isBuzzerPressed ? 4 : 0 }}
                transition={{ duration: 0.1 }}
              />

              {/* Pescoço */}
              <rect x="62" y="80" width="16" height="18" fill="url(#podiumContestantSkin)" />

              {/* Cabeça de frente */}
              <ellipse cx="70" cy="56" rx="22" ry="24" fill="url(#podiumContestantSkin)" />

              {/* Cabelo (Estilo moderno) */}
              <path
                d="
                  M48 55
                  C 46 36, 60 25, 78 25
                  C 94 25, 96 36, 92 50
                  C 90 42, 82 34, 70 34
                  C 58 34, 52 44, 50 55
                  Z
                "
                fill={hairColor}
              />
              <path
                d="
                  M46 52
                  C 44 32, 62 20, 80 22
                  C 94 24, 95 35, 93 45
                  C 88 34, 76 30, 64 34
                  Z
                "
                fill={hairColor}
                opacity="0.85"
              />

              {/* Orelhas */}
              <circle cx="48" cy="58" r="5" fill="url(#podiumContestantSkin)" />
              <circle cx="92" cy="58" r="5" fill="url(#podiumContestantSkin)" />

              {/* Rosto / Olhos de Frente */}
              <g id="contestant-face">
                {/* Sobrancelhas */}
                {state === 'wrong' ? (
                  <>
                    <line x1="56" y1="46" x2="64" y2="49" stroke="#261a12" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="76" y1="49" x2="84" y2="46" stroke="#261a12" strokeWidth="2.2" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <line x1="56" y1="48" x2="64" y2="47" stroke="#261a12" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="76" y1="47" x2="84" y2="48" stroke="#261a12" strokeWidth="2.2" strokeLinecap="round" />
                  </>
                )}

                {/* Olhos focados e atentos */}
                <ellipse cx="61" cy="54" rx="3.5" ry="4" fill="#0f172a" />
                <ellipse cx="79" cy="54" rx="3.5" ry="4" fill="#0f172a" />
                <circle cx="62" cy="53" r="1.2" fill="#ffffff" />
                <circle cx="80" cy="53" r="1.2" fill="#ffffff" />

                {/* Nariz */}
                <path d="M69 55 L71 61 L68 61" stroke="#ba7f5d" strokeWidth="1.2" fill="none" strokeLinecap="round" />

                {/* Boca */}
                {state === 'correct' ? (
                  // Sorriso de vitória
                  <path d="M63 67 Q70 75 77 67 Z" fill="#ffffff" stroke="#991b1b" strokeWidth="1" />
                ) : state === 'wrong' ? (
                  // Apreensivo
                  <path d="M64 70 Q70 65 76 70" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
                ) : (
                  // Neutro / concentrado
                  <path d="M65 68 Q70 71 75 68" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
                )}
              </g>
            </svg>
          )}
        </motion.div>

        {/* Púlpito do Game Show com Buzzer Luminoso (Camada Frontal) */}
        <div className="podium-hardware-wrapper">
          {/* Botão Vermelho Buzzer no Topo do Púlpito */}
          <div className="buzzer-mount" onClick={onBuzzerClick} title="Buzzer da Resposta">
            {/* Base do Buzzer */}
            <div className="buzzer-base" />
            {/* Botão Vermelho pulsante */}
            <motion.div
              className={`buzzer-cap ${isBuzzerPressed ? 'buzzer-pressed' : ''}`}
              animate={{
                scale: isBuzzerPressed ? 0.88 : [1, 1.05, 1],
                boxShadow: isBuzzerPressed
                  ? '0 0 25px #ef4444, inset 0 3px 5px rgba(0,0,0,0.5)'
                  : '0 0 15px rgba(239, 68, 68, 0.4), inset 0 2px 3px rgba(255,255,255,0.4)',
              }}
              transition={{
                scale: isBuzzerPressed ? { duration: 0.1 } : { duration: 2.2, repeat: Infinity },
              }}
            />
          </div>

          {/* O Púlpito Físico com Estrela / Brasão de Game Show */}
          <div className="podium-body-box">
            <div className="podium-top-rim" />
            <div className="podium-front-panel">
              <div className="podium-star-badge">
                <svg viewBox="0 0 24 24" className="podium-star-svg">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill="#f59e0b"
                    stroke="#b45309"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="podium-brand-text">NEXT</span>
            </div>
            <div className="podium-base-pedestal" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContestantPodium

