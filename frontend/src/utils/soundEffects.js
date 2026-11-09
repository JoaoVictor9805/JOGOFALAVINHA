// Utilitário de Efeitos Sonoros usando a Web Audio API nativa
// Não necessita de arquivos de áudio externos (.mp3/.wav)

let audioCtx = null

const getAudioContext = () => {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export const isSoundMuted = () => {
  return localStorage.getItem('falavinha_sound_muted') === 'true'
}

export const toggleSoundMute = () => {
  const current = isSoundMuted()
  const next = !current
  localStorage.setItem('falavinha_sound_muted', String(next))
  return next
}

// Som sutil de clique
export const playClickSound = () => {
  if (isSoundMuted()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(600, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05)

    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.05)
  } catch {
    // ignora falhas de áudio
  }
}

// Som de Acerto / Avanço de Fase (Arpeggio Ascendente Alegre)
export const playCorrectSound = () => {
  if (isSoundMuted()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const notas = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
    notas.forEach((freq, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08)

      gain.gain.setValueAtTime(0.18, ctx.currentTime + index * 0.08)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 0.2)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime + index * 0.08)
      osc.stop(ctx.currentTime + index * 0.08 + 0.2)
    })
  } catch {
    // ignora
  }
}

// Som de Erro (Grave descendente)
export const playWrongSound = () => {
  if (isSoundMuted()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(220, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.28)

    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.28)
  } catch {
    // ignora
  }
}

// Fanfarra de Vitória Final
export const playVictorySound = () => {
  if (isSoundMuted()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    // Melodia de celebração
    const notas = [
      { f: 523.25, d: 0.15 }, // C5
      { f: 659.25, d: 0.15 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 1046.5, d: 0.4 },  // C6
    ]

    let tempo = ctx.currentTime
    notas.forEach(({ f, d }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(f, tempo)

      gain.gain.setValueAtTime(0.25, tempo)
      gain.gain.exponentialRampToValueAtTime(0.001, tempo + d)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(tempo)
      osc.stop(tempo + d)
      tempo += d * 0.9
    })
  } catch {
    // ignora
  }
}

