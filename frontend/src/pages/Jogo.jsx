import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, RotateCcw } from 'lucide-react'
import StageTruss from '../components/StageTruss'
import HostPresenter from '../components/HostPresenter'
import ContestantPodium from '../components/ContestantPodium'
import QuestionBoard from '../components/QuestionBoard'
import AudienceSilhouette from '../components/AudienceSilhouette'
import { formatarTempo } from '../components/Cronometro'
import { playCorrectSound, playWrongSound, playVictorySound } from '../utils/soundEffects'
import desafios from '../data/desafios_falavinha.json'

function Jogo() {
  // Estados do Jogo
  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState('idle') // 'idle' | 'correct' | 'wrong'
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [isWrong, setIsWrong] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [isBuzzerPressed, setIsBuzzerPressed] = useState(false)

  // Nome do jogador salvo no Login
  const [playerName, setPlayerName] = useState('Você')

  useEffect(() => {
    const savedName = localStorage.getItem('falavinha_player_name')
    if (savedName) setPlayerName(savedName)
  }, [])

  // Cronômetro contínuo (sem pausar)
  const [time, setTime] = useState(0)

  // Refs de timers para limpeza segura
  const timerRef = useRef(null)
  const feedbackTimeoutRef = useRef(null)

  // Contagem do tempo contínuo
  useEffect(() => {
    if (hasWon) return

    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [hasWon])

  // Limpeza de estado quando a pergunta avança
  useEffect(() => {
    setFeedback('idle')
    setShowFeedback(false)
    setSelectedOption(null)
    setInputValue('')
    setIsWrong(false)
    setIsAnimating(false)
  }, [currentIndex])

  // Desafio atual
  const currentQuestion = desafios[currentIndex]

  // Normalização de texto para comparação robusta
  const normalizar = (txt) =>
    String(txt || '')
      .trim()
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

  // Efeito tátil de acionamento do Buzzer do Púlpito
  const triggerBuzzer = () => {
    setIsBuzzerPressed(true)
    setTimeout(() => setIsBuzzerPressed(false), 220)
  }

  // Lógica ao acertar qualquer fase
  const handleAcerto = useCallback(() => {
    triggerBuzzer()
    setFeedback('correct')
    setShowFeedback(true)
    setIsAnimating(true)
    playCorrectSound()

    feedbackTimeoutRef.current = setTimeout(() => {
      const proximoIndex = currentIndex + 1

      // Verificação correta de vitória (somente após concluir o último desafio!)
      if (proximoIndex >= desafios.length) {
        setHasWon(true)
        playVictorySound()
      } else {
        setCurrentIndex(proximoIndex)
        setIsAnimating(false)
      }
    }, 1300)
  }, [currentIndex])

  // Lógica ao errar (sem revelar a resposta certa!)
  const handleErro = useCallback(() => {
    triggerBuzzer()
    setFeedback('wrong')
    setShowFeedback(true)
    setIsWrong(true)
    playWrongSound()

    feedbackTimeoutRef.current = setTimeout(() => {
      setIsWrong(false)
      setFeedback('idle')
      setShowFeedback(false)
      setSelectedOption(null)
    }, 1800)
  }, [])

  // Seleção de múltipla escolha
  const handleSelectOption = useCallback(
    (option) => {
      if (feedback !== 'idle' || hasWon) return

      setSelectedOption(option)
      const respostaEsperada = currentQuestion.resposta_correta
      const isCorrect = normalizar(option) === normalizar(respostaEsperada)

      if (isCorrect) {
        handleAcerto()
      } else {
        handleErro()
      }
    },
    [feedback, hasWon, currentQuestion, handleAcerto, handleErro]
  )

  // Envio de texto ou senha
  const handleSubmitText = useCallback(
    (answer) => {
      if (feedback !== 'idle' || hasWon) return

      const respostaDigitada = normalizar(answer)
      const respostaEsperada = normalizar(currentQuestion.resposta_correta)

      // Permite 1976 ou 1977 para o ano de fundação (Desafio 5)
      const isCorrect =
        respostaDigitada === respostaEsperada ||
        (currentQuestion.id === 5 && (respostaDigitada === '1976' || respostaDigitada === '1977'))

      if (isCorrect) {
        handleAcerto()
      } else {
        handleErro()
      }
    },
    [feedback, hasWon, currentQuestion, handleAcerto, handleErro]
  )

  const handleRestart = () => {
    setCurrentIndex(0)
    setTime(0)
    setHasWon(false)
    setFeedback('idle')
    setShowFeedback(false)
    setSelectedOption(null)
    setInputValue('')
  }

  // Falas dinâmicas do apresentador
  const hintText =
    feedback === 'correct'
      ? 'Resposta certa! Avançando no palco!'
      : feedback === 'wrong'
        ? 'Não foi dessa vez, tente novamente!'
        : 'E a pergunta é... responda para avançar!'

  return (
    <div className="stage-scene-root">
      {/* Cortinas Teatrais Laterais do Palco */}
      <div className="stage-curtain curtain-left" />
      <div className="stage-curtain curtain-right" />

      {/* Iluminação de Holofotes no Topo */}
      <div className="stage-spotlight-beam beam-left" />
      <div className="stage-spotlight-beam beam-center" />
      <div className="stage-spotlight-beam beam-right" />

      {/* Treliça Superior Metálica com Checkpoints + Runner + Cronômetro */}
      <StageTruss
        currentCheckpoint={hasWon ? desafios.length : currentIndex}
        isAnimating={isAnimating}
        isWrong={isWrong}
        totalCheckpoints={desafios.length}
        tempo={time}
      />

      {/* Arena Central do Palco */}
      <main className="stage-arena-content">
        {hasWon ? (
          <motion.div
            className="victory-gameshow-card telao-bezel-outer"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="telao-screen-surface victory-screen-content">
              <div className="trophy-badge gameshow-trophy">
                <Trophy className="trophy-icon" />
              </div>
              <h1 className="gameshow-victory-title">SHOW CONCLUÍDO COM SUCESSO!</h1>
              <p className="gameshow-victory-subtitle">
                Parabéns, {playerName}! Você decifrou todos os 7 desafios do Escape Room Falavinha Next!
              </p>

              <div className="victory-stat-box">
                <span className="stat-label">TEMPO TOTAL DE PALCO</span>
                <span className="stat-value text-emerald">{formatarTempo(time)}</span>
                <span className="stat-sub">{time} segundos decorridos</span>
              </div>

              <button
                type="button"
                className="btn-gameshow-restart"
                onClick={handleRestart}
              >
                <RotateCcw className="w-5 h-5 mr-2 inline" />
                JOGAR NOVAMENTE
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="stage-actors-grid">
            {/* Lado Esquerdo: Apresentador (CEO) */}
            <aside className="stage-column-host">
              <HostPresenter state={feedback} hintText={hintText} />
            </aside>

            {/* Centro: O Telão Gigante do Game Show */}
            <section className="stage-column-telao">
              <QuestionBoard
                question={currentQuestion}
                phase={currentIndex + 1}
                totalPhases={desafios.length}
                feedback={feedback}
                showFeedback={showFeedback}
                selectedOption={selectedOption}
                onSelectOption={handleSelectOption}
                onSubmitText={handleSubmitText}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </section>

            {/* Lado Direito: Jogador de Frente com Púlpito e Buzzer */}
            <aside className="stage-column-contestant">
              <ContestantPodium
                state={feedback}
                isBuzzerPressed={isBuzzerPressed}
                onBuzzerClick={triggerBuzzer}
                playerName={playerName}
              />
            </aside>
          </div>
        )}
      </main>

      {/* Piso de Madeira Taboada Iluminada do Palco */}
      <div className="stage-floor-board" />

      {/* Silhueta da Plateia Assistindo no Rodapé */}
      <AudienceSilhouette isCheering={feedback === 'correct' || hasWon} />
    </div>
  )
}

export default Jogo
