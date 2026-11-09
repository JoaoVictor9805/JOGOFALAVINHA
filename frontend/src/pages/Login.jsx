import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, ArrowRight, RotateCcw } from 'lucide-react'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nome: '',
    email: '',
    unidade: 'Curitiba - Matriz',
    setor: 'Tributário',
  })
  const [jogoEmAndamento, setJogoEmAndamento] = useState(null)

  useEffect(() => {
    // Carrega dados salvos anteriormente se houver
    const savedName = localStorage.getItem('falavinha_player_name') || ''
    const savedDept = localStorage.getItem('falavinha_player_dept') || 'Tributário'
    const savedUnit = localStorage.getItem('falavinha_player_unit') || 'Curitiba - Matriz'
    const savedEmail = localStorage.getItem('falavinha_player_email') || ''

    if (savedName) {
      setForm((prev) => ({
        ...prev,
        nome: savedName,
        email: savedEmail,
        unidade: savedUnit,
        setor: savedDept,
      }))
    }

    // Verifica se há partida em andamento
    const progress = localStorage.getItem('falavinha_game_progress')
    if (progress) {
      try {
        const parsed = JSON.parse(progress)
        if (parsed.currentIndex > 0 || parsed.time > 0) {
          setJogoEmAndamento(parsed)
        }
      } catch {
        // ignora
      }
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleStartNew = (e) => {
    e.preventDefault()
    localStorage.removeItem('falavinha_game_progress')
    localStorage.removeItem('falavinha_final_time')

    localStorage.setItem('falavinha_player_name', form.nome.trim() || 'Colaborador Next')
    localStorage.setItem('falavinha_player_email', form.email.trim())
    localStorage.setItem('falavinha_player_unit', form.unidade)
    localStorage.setItem('falavinha_player_dept', form.setor)

    navigate('/jogo')
  }

  const handleResume = () => {
    navigate('/jogo')
  }

  return (
    <div className="login-screen">
      <div className="login-card glass-card teal-glow">
        <div className="login-badge">FALAVINHA NEXT</div>
        <h1 className="login-title">Escape Room Virtual</h1>
        <p className="login-description">
          Prepare-se para o Desafio Next! Responda às 7 etapas no menor tempo possível para pontuar pela sua equipe e setor.
        </p>

        {jogoEmAndamento && (
          <div className="resume-card">
            <div>
              <strong>Partida em andamento encontrada!</strong>
              <p>Fase {jogoEmAndamento.currentIndex + 1} de 7 ({jogoEmAndamento.time}s decorridos)</p>
            </div>
            <button type="button" className="btn-retomar" onClick={handleResume}>
              Continuar <ArrowRight className="w-4 h-4 ml-1 inline" />
            </button>
          </div>
        )}

        <form onSubmit={handleStartNew} className="login-form">
          <div className="login-input-group">
            <label htmlFor="nome">Nome Completo *</label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Digite seu nome"
              value={form.nome}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="email">E-mail Corporativo *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu.nome@falavinha.com.br"
              value={form.email}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>

          <div className="login-grid-2">
            <div className="login-input-group">
              <label htmlFor="unidade">Unidade *</label>
              <select
                id="unidade"
                name="unidade"
                value={form.unidade}
                onChange={handleChange}
                className="login-select"
                required
              >
                <option value="Curitiba - Matriz">Curitiba - Matriz</option>
                <option value="Londrina">Londrina</option>
                <option value="Maringá">Maringá</option>
                <option value="Ponta Grossa">Ponta Grossa</option>
                <option value="Cascavel">Cascavel</option>
                <option value="Remoto / Outra">Remoto / Outra</option>
              </select>
            </div>

            <div className="login-input-group">
              <label htmlFor="setor">Setor / Departamento *</label>
              <select
                id="setor"
                name="setor"
                value={form.setor}
                onChange={handleChange}
                className="login-select"
                required
              >
                <option value="Tributário">Tributário</option>
                <option value="Contábil">Contábil</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Recursos Humanos">Recursos Humanos</option>
                <option value="TI / Inovação">TI / Inovação</option>
                <option value="Comercial / Vendas">Comercial / Vendas</option>
                <option value="Operações / Suporte">Operações / Suporte</option>
                <option value="Diretoria / Gestão">Diretoria / Gestão</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-iniciar">
            <Play className="w-5 h-5 fill-current" />
            {jogoEmAndamento ? 'Iniciar Nova Partida' : 'Iniciar Desafio'}
          </button>
        </form>

        <div className="login-footer-info">
          <span>⏱ Cronômetro contínuo · Tentativas ilimitadas · Pontuação por Setor</span>
        </div>
      </div>
    </div>
  )
}

export default Login
