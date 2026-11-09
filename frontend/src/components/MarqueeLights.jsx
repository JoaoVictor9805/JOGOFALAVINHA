function MarqueeLights({ topCount = 22, bottomCount = 20, sideCount = 10 }) {
  return (
    <div className="marquee-lights-border" aria-hidden="true">
      {/* Fileira Superior de Lâmpadas */}
      <div className="marquee-lights-row marquee-lights-top">
        {Array.from({ length: topCount }).map((_, i) => (
          <span
            key={`top-${i}`}
            className={`marquee-bulb ${i % 2 === 0 ? 'bulb-phase-1' : 'bulb-phase-2'}`}
          />
        ))}
      </div>

      {/* Lado Direito de Lâmpadas (Inclinado) */}
      <div className="marquee-lights-col marquee-lights-right">
        {Array.from({ length: sideCount }).map((_, i) => (
          <span
            key={`right-${i}`}
            className={`marquee-bulb ${i % 2 === 0 ? 'bulb-phase-2' : 'bulb-phase-1'}`}
          />
        ))}
      </div>

      {/* Fileira Inferior de Lâmpadas */}
      <div className="marquee-lights-row marquee-lights-bottom">
        {Array.from({ length: bottomCount }).map((_, i) => (
          <span
            key={`bottom-${i}`}
            className={`marquee-bulb ${i % 2 === 0 ? 'bulb-phase-1' : 'bulb-phase-2'}`}
          />
        ))}
      </div>

      {/* Lado Esquerdo de Lâmpadas (Inclinado) */}
      <div className="marquee-lights-col marquee-lights-left">
        {Array.from({ length: sideCount }).map((_, i) => (
          <span
            key={`left-${i}`}
            className={`marquee-bulb ${i % 2 === 0 ? 'bulb-phase-2' : 'bulb-phase-1'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default MarqueeLights
