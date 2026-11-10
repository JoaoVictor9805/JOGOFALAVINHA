function MarqueeLights({ topCount = 22, bottomCount = 20, sideCount = 10 }) {
  // Proporção de inclinação em X do trapézio: 3.6% de deslocamento da borda superior até a inferior
  const slantTotalPercent = 3.6

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

      {/* Lado Direito de Lâmpadas (Acompanha a inclinação exata da moldura) */}
      <div className="marquee-lights-col marquee-lights-right">
        {Array.from({ length: sideCount }).map((_, i) => {
          const t = i / (sideCount - 1)
          // Altura relativa no telão (de y ≈ 26px até 574px num total de 600px)
          const yFraction = (26 + t * (600 - 52)) / 600
          const slantOffset = (yFraction * slantTotalPercent).toFixed(2)

          return (
            <span
              key={`right-${i}`}
              className={`marquee-bulb ${i % 2 === 0 ? 'bulb-phase-2' : 'bulb-phase-1'}`}
              style={{
                top: `calc(26px + ${t} * (100% - 52px))`,
                right: `calc(var(--bulb-side-inset, 10px) + ${slantOffset}%)`,
              }}
            />
          )
        })}
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

      {/* Lado Esquerdo de Lâmpadas (Acompanha a inclinação exata da moldura) */}
      <div className="marquee-lights-col marquee-lights-left">
        {Array.from({ length: sideCount }).map((_, i) => {
          const t = i / (sideCount - 1)
          const yFraction = (26 + t * (600 - 52)) / 600
          const slantOffset = (yFraction * slantTotalPercent).toFixed(2)

          return (
            <span
              key={`left-${i}`}
              className={`marquee-bulb ${i % 2 === 0 ? 'bulb-phase-2' : 'bulb-phase-1'}`}
              style={{
                top: `calc(26px + ${t} * (100% - 52px))`,
                left: `calc(var(--bulb-side-inset, 10px) + ${slantOffset}%)`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default MarqueeLights
