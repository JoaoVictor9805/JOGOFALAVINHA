import { motion } from 'framer-motion'

function BotaoAlternativa({ letra, texto, onClick, status = 'default', disabled = false }) {
  let statusClass = 'opcao-padrao'
  if (status === 'correct') statusClass = 'opcao-correta'
  if (status === 'wrong') statusClass = 'opcao-errada'

  return (
    <motion.button
      type="button"
      className={`btn-opcao gameshow-option ${statusClass}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.015, x: 4 } : {}}
      whileTap={!disabled ? { scale: 0.985 } : {}}
    >
      <span className="opcao-letra gameshow-bracket">[ {letra} ]</span>
      <span className="opcao-texto">{texto}</span>
      {status === 'correct' && <span className="option-sparkle">✨</span>}
    </motion.button>
  )
}

export default BotaoAlternativa
