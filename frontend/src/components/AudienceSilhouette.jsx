import { motion } from 'framer-motion'

function AudienceSilhouette({ isCheering = false }) {
  return (
    <div className="stage-audience-wrapper" aria-hidden="true">
      <motion.svg
        viewBox="0 0 1200 130"
        preserveAspectRatio="none"
        className="audience-svg"
        animate={{
          y: isCheering ? [0, -6, 0, -4, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
        }}
      >
        <defs>
          <linearGradient id="audienceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#081a1a" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#040d0d" stopOpacity="1" />
            <stop offset="100%" stopColor="#020606" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="rimLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Camada de fundo de plateia (mais baixa e suave) */}
        <g opacity="0.6">
          {/* Silhuetas traseiras */}
          <circle cx="80" cy="85" r="28" fill="#041212" />
          <circle cx="210" cy="80" r="30" fill="#041212" />
          <circle cx="340" cy="82" r="26" fill="#041212" />
          <circle cx="480" cy="80" r="32" fill="#041212" />
          <circle cx="620" cy="84" r="28" fill="#041212" />
          <circle cx="760" cy="80" r="30" fill="#041212" />
          <circle cx="890" cy="82" r="27" fill="#041212" />
          <circle cx="1020" cy="80" r="31" fill="#041212" />
          <circle cx="1140" cy="85" r="29" fill="#041212" />
        </g>

        {/* Camada frontal da plateia (silhuetas bem recortadas como no jogo) */}
        <path
          d="
            M 0 130
            L 0 95
            C 15 95, 25 80, 45 78
            C 50 62, 75 60, 85 75
            C 100 78, 120 85, 135 100
            C 145 88, 165 72, 190 70
            C 200 55, 225 55, 235 70
            C 255 75, 270 90, 285 102
            C 305 92, 320 74, 345 72
            C 355 58, 380 58, 390 72
            C 410 76, 425 90, 440 100
            C 460 88, 475 75, 500 72
            C 512 55, 538 55, 550 72
            C 570 78, 585 92, 600 102
            C 620 90, 635 76, 660 74
            C 672 58, 698 58, 710 74
            C 730 80, 745 92, 760 102
            C 780 88, 795 72, 820 70
            C 832 54, 858 54, 870 70
            C 890 76, 905 90, 920 102
            C 940 90, 955 76, 980 74
            C 992 56, 1018 56, 1030 74
            C 1050 78, 1065 90, 1080 102
            C 1100 88, 1115 75, 1140 72
            C 1152 58, 1175 60, 1185 75
            C 1195 85, 1200 95, 1200 130
            Z
          "
          fill="url(#audienceGrad)"
          stroke="url(#rimLight)"
          strokeWidth="1.5"
        />
      </motion.svg>
    </div>
  )
}

export default AudienceSilhouette

