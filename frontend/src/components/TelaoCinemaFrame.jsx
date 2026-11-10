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
          <stop offset="22%" stopColor="#eab308" />
          <stop offset="58%" stopColor="#d97706" />
          <stop offset="85%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        {/* Gradiente do Painel Branco Iluminado (Lightbox) */}
        <radialGradient id="telaoScreenGrad" cx="50%" cy="32%" r="72%">
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
      {/* Topo: x=0 a x=1000; Base: x=36 a x=964 (inclinação de 3.6% cada lado). Altura: 600 */}
      <path
        d="
          M 24 0
          L 976 0
          Q 1000 0 998.5 24
          L 965.5 576
          Q 964 600 940 600
          L 60 600
          Q 36 600 34.5 576
          L 1.5 24
          Q 0 0 24 0
          Z
        "
        fill="url(#telaoBezelGrad)"
        stroke="#78350f"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />

      {/* 2. PAINEL INTERNO BRANCO / LIGHTBOX (Cantos arredondados + Borda dourada 3.5px visível em todos os lados) */}
      {/* Inset de ~22px em todos os lados. A base fica em y=580 com borda contínua de 3.5px */}
      <path
        d="
          M 40 20
          L 960 20
          Q 976 20 975 36
          L 944 564
          Q 943 580 927 580
          L 73 580
          Q 57 580 56 564
          L 25 36
          Q 24 20 40 20
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
          M 40 20
          L 960 20
          Q 976 20 975 36
          L 944 564
          Q 943 580 927 580
          L 73 580
          Q 57 580 56 564
          L 25 36
          Q 24 20 40 20
          Z
        "
        fill="url(#telaoScanlines)"
        opacity="0.8"
      />
    </svg>
  )
}

export default TelaoCinemaFrame

