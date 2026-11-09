import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, RotateCcw, Home, Clock, Award, Users, ListOrdered } from 'lucide-react'
import { formatarTempo } from '../components/Cronometro'

function Ranking() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('geral') // 'geral' | 'setor'

  const tempoFinal = parseInt(localStorage.getItem('falavinha_final_time') || '0', 10)
  const playerName = localStorage.getItem('falavinha_player_name') || 'Colaborador Next'
  const playerDept = localStorage.getItem('falavinha_player_dept') || 'Geral'
  const playerUnit = localStorage.getItem('falavinha_player_unit') || 'Matriz'

  const [historico, setHistorico] = useState([])

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('falavinha_ranking_history') || '[]')
      // Se não houver nenhum histórico ainda, inicializa com a partida atual
      if (data.length === 0 && tempoFinal > 0) {
        const inicial = [
          {
            id: 1,
            nome: playerName,
            setor: playerDept,
            unidade: playerUnit,
            tempo: tempoFinal,
            data: new Date().toLocaleDateString('pt-BR'),
          },
        ]
        setHistorico(inicial)
        localStorage.setItem('falavinha_ranking_history', JSON.stringify(inicial))
      } else {
        setHistorico(data)
      }
    } catch {
      setHistorico([])
    }
  }, [tempoFinal, playerName, playerDept, playerUnit])

  // Ranking Geral ordenado por menor tempo
  const rankingGeral = [...historico].sort((a, b) => a.tempo - b.tempo)

  // Ranking por Setor (menor tempo de cada setor)
  const rankingPorSetor = (() => {
    const setoresMap = {}
    historico.forEach((item) => {
      if (!setoresMap[item.setor] || item.tempo < setoresMap[item.setor].tempo) {
        setoresMap[item.setor] = item
      }
    })
    return Object.values(setoresMap).sort((a, b) => a.tempo - b.tempo)
  })()

  const handleRestart = () => {
    localStorage.removeItem('falavinha_final_time')
    navigate('/jogo')
  }

  const handleHome = () => {
    localStorage.removeItem('falavinha_final_time')
    navigate('/')
  }

  return (
    <div className="ranking-screen">
      <motion.div
        className="ranking-card glass-card teal-glow"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="trophy-badge"
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
        >
          <Trophy className="trophy-icon" />
        </motion.div>

        <h1 className="ranking-title">Parabéns! Desafio Concluído!</h1>
        <p className="ranking-subtitle">
          Você completou com sucesso todos os 7 enigmas do Escape Room Falavinha Next!
        </p>

        {/* Estatísticas da partida atual */}
        <div className="stats-container">
          <div className="stat-box">
            <span className="stat-label">
              <Award className="w-4 h-4" /> Jogador / Equipe
            </span>
            <span className="stat-value">{playerName}</span>
            <span className="stat-sub">{playerDept} · {playerUnit}</span>
          </div>

          <div className="stat-box">
            <span className="stat-label">
              <Clock className="w-4 h-4" /> Tempo Total
            </span>
            <span className="stat-value text-emerald">{formatarTempo(tempoFinal)}</span>
            <span className="stat-sub">{tempoFinal} segundos decorridos</span>
          </div>
        </div>

        {/* Tabela de Classificação */}
        <div className="leaderboard-section">
          <div className="leaderboard-tabs">
            <button
              type="button"
              className={`tab-btn ${tab === 'geral' ? 'tab-active' : ''}`}
              onClick={() => setTab('geral')}
            >
              <ListOrdered className="w-4 h-4 inline mr-1" />
              Ranking Geral
            </button>
            <button
              type="button"
              className={`tab-btn ${tab === 'setor' ? 'tab-active' : ''}`}
              onClick={() => setTab('setor')}
            >
              <Users className="w-4 h-4 inline mr-1" />
              Ranking por Setor
            </button>
          </div>

          <div className="leaderboard-table-wrapper">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{tab === 'geral' ? 'Colaborador' : 'Setor'}</th>
                  {tab === 'geral' && <th>Setor</th>}
                  <th>Tempo</th>
                </tr>
              </thead>
              <tbody>
                {(tab === 'geral' ? rankingGeral : rankingPorSetor).map((item, idx) => (
                  <tr key={item.id || idx} className={item.nome === playerName ? 'row-highlight' : ''}>
                    <td className="rank-pos">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}º`}
                    </td>
                    <td className="rank-name">{tab === 'geral' ? item.nome : item.setor}</td>
                    {tab === 'geral' && <td className="rank-dept">{item.setor}</td>}
                    <td className="rank-time">{formatarTempo(item.tempo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ações */}
        <div className="ranking-actions">
          <button type="button" className="btn-reiniciar" onClick={handleRestart}>
            <RotateCcw className="w-5 h-5" />
            Jogar Novamente
          </button>
          <button type="button" className="btn-voltar" onClick={handleHome}>
            <Home className="w-5 h-5" />
            Tela Inicial
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Ranking
