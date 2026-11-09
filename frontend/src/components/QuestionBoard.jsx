import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react'
import BotaoAlternativa from './BotaoAlternativa'

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
      {/* Moldura Externa do Telão com Bisel e Acabamento de Palco */}
      <div className="telao-bezel-outer">
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
        </div>

        {/* Pés/Suportes do Telão no Palco */}
        <div className="telao-stand-legs">
          <div className="stand-leg stand-leg-left" />
          <div className="stand-leg stand-leg-right" />
        </div>
      </div>

      {/* Pop-up de Feedback Sutil de Telão */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className={`telao-feedback-flash ${
              feedback === 'correct' ? 'flash-success' : 'flash-error'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {feedback === 'correct' ? (
              <div className="feedback-content-row text-emerald">
                <CheckCircle2 className="w-6 h-6 inline mr-2" />
                <span>CORRETO! PONTUAÇÃO GARANTIDA!</span>
              </div>
            ) : (
              <div className="feedback-content-row text-coral">
                <XCircle className="w-6 h-6 inline mr-2" />
                <span>OPS! TENTE NOVAMENTE!</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default QuestionBoard
