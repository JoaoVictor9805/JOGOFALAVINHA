function MarqueeLights({ topCount = 22, bottomCount = 20, sideCount = 10 }) {
  // Proporção de inclinação em X do trapézio: 4.0% de deslocamento da borda superior até a inferior (40u em 1000u)
  const slantTotalPercent = 4.0

  return (
    <div className="marquee-lights-border" aria-hidden="true">
      {/* Fileira Superior de Lâmpadas (Centralizada na moldura superior) */}
      <div className="marquee-lights-row marquee-lights-top">
        {Array.from({ length: topCount }).map((_, i) => (
          <span
            key={`top-${i}`}
            className={`marquee-bulb ${i % 2 === 0 ? 'bulb-phase-1' : 'bulb-phase-2'}`}
          />
        ))}
      </div>

      {/* Lado Direito de Lâmpadas (Centralizado na moldura amarela alargada e inclinado) */}
      <div className="marquee-lights-col marquee-lights-right">
        {Array.from({ length: sideCount }).map((_, i) => {
          const t = i / (sideCount - 1)
          const yFraction = (24 + t * (600 - 48)) / 600
          const slantOffset = (yFraction * slantTotalPercent).toFixed(2)

          return (
            <span
              key={`right-${i}`}
              className={`marquee-bulb ${i % 2 === 0 ? 'bulb-phase-2' : 'bulb-phase-1'}`}
              style={{
                top: `calc(24px + ${t} * (100% - 48px))`,
                right: `calc(var(--bulb-side-inset, 17px) + ${slantOffset}%)`,
              }}
            />
          )
        })}
      </div>

      {/* Fileira Inferior de Lâmpadas (Centralizada na moldura inferior) */}
      <div className="marquee-lights-row marquee-lights-bottom">
        {Array.from({ length: bottomCount }).map((_, i) => (
          <span
            key={`bottom-${i}`}
            className={`marquee-bulb ${i % 2 === 0 ? 'bulb-phase-1' : 'bulb-phase-2'}`}
          />
        ))}
      </div>

      {/* Lado Esquerdo de Lâmpadas (Centralizado na moldura amarela alargada e inclinado) */}
      <div className="marquee-lights-col marquee-lights-left">
        {Array.from({ length: sideCount }).map((_, i) => {
          const t = i / (sideCount - 1)
          const yFraction = (24 + t * (600 - 48)) / 600
          const slantOffset = (yFraction * slantTotalPercent).toFixed(2)

          return (
            <span
              key={`left-${i}`}
              className={`marquee-bulb ${i % 2 === 0 ? 'bulb-phase-2' : 'bulb-phase-1'}`}
              style={{
                top: `calc(24px + ${t} * (100% - 48px))`,
                left: `calc(var(--bulb-side-inset, 17px) + ${slantOffset}%)`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default MarqueeLights
