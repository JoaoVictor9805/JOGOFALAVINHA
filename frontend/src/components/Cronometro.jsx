import { Clock } from 'lucide-react'

export const formatarTempo = (segundos) => {
  const mins = Math.floor(segundos / 60)
  const secs = segundos % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function Cronometro({ tempo = 0, isRunning = true }) {
  const displayTime = formatarTempo(tempo)

  return (
    <div className="cronometro-container">
      <Clock className="cronometro-icone" />
      <span className="cronometro-display">{displayTime}</span>
    </div>
  )
}

export default Cronometro

