function TelaoCinemaFrame() {
  return (
    <svg
      className="telao-svg-bg"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Gradiente da Moldura Amarela / Dourada do Cinema */}
        <linearGradient id="telaoBezelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="20%" stopColor="#eab308" />
          <stop offset="55%" stopColor="#d97706" />
          <stop offset="85%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        {/* Gradiente do Painel Branco Iluminado (Lightbox) */}
        <radialGradient id="telaoScreenGrad" cx="50%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#faf7f2" />
          <stop offset="88%" stopColor="#f4ece1" />
          <stop offset="100%" stopColor="#e9dfd1" />
        </radialGradient>

        {/* Linhas de scanline sutis no painel da tela */}
        <pattern
          id="telaoScanlines"
          width="10"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="16"
            x2="10"
            y2="16"
            stroke="rgba(160, 115, 60, 0.12)"
            strokeWidth="1.2"
          />
        </pattern>
      </defs>

      {/* 1. MOLDURA EXTERNA AMARELA (Trapézio com todos os 4 cantos perfeitamente arredondados) */}
      {/* Topo: x=0 a x=1000; Base: x=40 a x=960 (inclinação de 4% cada lado). Altura: 600. Raio: 28px */}
      <path
        d="
          M 28 0
          L 972 0
          Q 1000 0 998.5 28
          L 961.5 572
          Q 960 600 932 600
          L 68 600
          Q 40 600 38.5 572
          L 1.5 28
          Q 0 0 28 0
          Z
        "
        fill="url(#telaoBezelGrad)"
        stroke="#78350f"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />

      {/* 2. PAINEL INTERNO BRANCO / LIGHTBOX (Borda amarela alargada para 44u para centralizar as lâmpadas) */}
      {/* Inset uniforme de 44u. Borda dourada 3.5px visível em todos os lados */}
      <path
        d="
          M 63 44
          L 937 44
          Q 953 44 952 60
          L 920 540
          Q 919 556 903 556
          L 97 556
          Q 81 556 80 540
          L 48 60
          Q 47 44 63 44
          Z
        "
        fill="url(#telaoScreenGrad)"
        stroke="#854d0e"
        strokeWidth="3.5"
        vectorEffect="non-scaling-stroke"
      />

      {/* 3. TEXTURA DE SCANLINES SUTIS CONFINADA AO PAINEL INTERNO */}
      <path
        d="
          M 63 44
          L 937 44
          Q 953 44 952 60
          L 920 540
          Q 919 556 903 556
          L 97 556
          Q 81 556 80 540
          L 48 60
          Q 47 44 63 44
          Z
        "
        fill="url(#telaoScanlines)"
        opacity="0.75"
      />
    </svg>
  )
}

export default TelaoCinemaFrame
