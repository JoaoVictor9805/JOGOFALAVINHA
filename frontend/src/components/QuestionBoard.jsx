import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react'
import BotaoAlternativa from './BotaoAlternativa'
import MarqueeLights from './MarqueeLights'

const LETRAS_OPCOES = ['A', 'B', 'C', 'D']

const CATEGORIAS_DESAFIO = {
  1: 'TRIBUTÁRIO',
  2: 'COMUNICAÇÃO',
  3: 'CHARADA CORPORATIVA',
  4: 'ATENDIMENTO',
  5: 'ACESSO RESTRITO',
  6: 'COMPROMISSO & PRAZOS',
  7: 'CULTURA NEXT',
}

function QuestionBoard({
  question,
  phase,
  totalPhases = 7,
  feedback = 'idle',
  showFeedback = false,
  selectedOption = null,
  onSelectOption,
  onSubmitText,
  inputValue = '',
  setInputValue,
}) {
  if (!question) return null

  const isMultipleChoice = question.tipo === 'multipla_escolha'
  const categoria = CATEGORIAS_DESAFIO[question.id] || question.fase || 'DESAFIO'

  return (
    <div className={`telao-stage-container ${feedback === 'wrong' ? 'telao-shake-error' : ''}`}>
      {/* Moldura Externa do Telão / Letreiro de Cinema com Bisel Amarelo */}
      <div className="telao-bezel-outer">
        {/* Lâmpadas Piscantes Circulares do Letreiro de Cinema */}
        <MarqueeLights />

        {/* Painel Interno de LED / Display */}
        <div className="telao-screen-surface">
          {/* Efeito sutil de scanlines/grade de palco */}
          <div className="telao-scanline-overlay" />

          {/* Badges do Topo (como na imagem de referência) */}
          <div className="telao-top-badges">
            <div className="telao-badge-box badge-desafio-box">
              <span className="badge-text">
                DESAFIO {phase} DE {totalPhases}
              </span>
            </div>

            <div className="telao-badge-box badge-categoria-box">
              <span className="badge-text">{categoria}</span>
            </div>
          </div>

          {/* Texto Central da Pergunta */}
          <div className="telao-question-area">
            <motion.h2
              key={question.id}
              className="telao-question-text"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              {question.pergunta}
            </motion.h2>
          </div>

          {/* Área de Interação e Alternativas */}
          <div className="telao-interaction-area">
            <AnimatePresence mode="wait">
              {isMultipleChoice ? (
                <motion.div
                  key={`options-${question.id}`}
                  className="telao-options-list"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {question.opcoes?.map((opcao, index) => {
                    let status = 'default'
                    if (feedback === 'correct' && opcao === selectedOption) {
                      status = 'correct'
                    } else if (feedback === 'wrong' && opcao === selectedOption) {
                      status = 'wrong'
                    }

                    return (
                      <BotaoAlternativa
                        key={opcao}
                        letra={LETRAS_OPCOES[index] || String(index + 1)}
                        texto={opcao}
                        status={status}
                        disabled={feedback === 'correct' || feedback === 'wrong'}
                        onClick={() => onSelectOption?.(opcao)}
                      />
                    )
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key={`input-${question.id}`}
                  className="telao-input-area"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <div className="telao-input-wrapper">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue?.(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onSubmitText?.(inputValue)
                        }
                      }}
                      placeholder={
                        question.tipo === 'senha'
                          ? 'DIGITE O CÓDIGO / SENHA...'
                          : 'DIGITE A SUA RESPOSTA...'
                      }
                      disabled={feedback === 'correct'}
                      className="telao-text-input"
                      autoFocus
                    />
                    <button
                      type="button"
                      className="telao-btn-confirm"
                      onClick={() => onSubmitText?.(inputValue)}
                      disabled={feedback === 'correct' || !inputValue.trim()}
                    >
                      ENVIAR RESPOSTA
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pop-up de Feedback Centralizado na Caixa da Pergunta */}
          <AnimatePresence>
            {showFeedback && (
              <div className="telao-feedback-overlay">
                <motion.div
                  className={`telao-feedback-card ${
                    feedback === 'correct' ? 'feedback-card-success' : 'feedback-card-error'
                  }`}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <div className="feedback-card-icon-wrapper">
                    {feedback === 'correct' ? (
                      <CheckCircle2 className="feedback-card-icon icon-success" />
                    ) : (
                      <XCircle className="feedback-card-icon icon-error" />
                    )}
                  </div>
                  <div className="feedback-card-text-col">
                    <span className="feedback-card-badge">
                      {feedback === 'correct' ? 'RESPOSTA EXATA' : 'RESPOSTA INCORRETA'}
                    </span>
                    <h3 className="feedback-card-title">
                      {feedback === 'correct' ? 'PARABÉNS, VOCÊ ACERTOU!' : 'NÃO FOI DESSA VEZ!'}
                    </h3>
                    <p className="feedback-card-subtitle">
                      {feedback === 'correct'
                        ? 'Pontuação garantida! Avançando no palco...'
                        : 'Tente novamente para encontrar a resposta certa!'}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default QuestionBoard
