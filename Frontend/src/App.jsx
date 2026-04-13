import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  // Controle de Sessão
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')))
  const [tela, setTela] = useState('login') // login, cadastro, dashboard

  // Estados para dados do banco e inputs do usuário (Estados do Dashboard)
  const [resumo, setResumo] = useState(null);
  const [valor, setValor] = useState('');
  const [combustivel, setCombustivel] = useState('');

  // Estados do Formulário de Auth
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState('')

  // --- LÓGICA DE AUTENTICAÇÃO ---

  const fazerLogin = async (e) => {
    e.preventDefault()
    try {
      const resp = await axios.post('http://localhost:3000/auth/login', { email, senha })
      localStorage.setItem('token', resp.data.token)
      localStorage.setItem('usuario', JSON.stringify(resp.data.usuario))
      setToken(resp.data.token)
      setUsuario(resp.data.usuario)

    } catch (err) {
      alert("E-mail ou senha inválidos")
    }
  }

  const fazerCadastro = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/auth/registrar', { nome, email, senha })
      alert("Cadastro realizado! Faça login.")
      setTela('login')

    } catch (err) {
      alert("Erro ao cadastrar")
    }
  }

  const logout = () => {
    localStorage.clear()
    setToken(null)
    setUsuario(null)
    setTela('login')
  }


  // --- LÓGICA DAS CORRIDAS (COM TOKEN) ---

  const buscarDados = async () => {
    try {
      // ENVIANDO O TOKEN NO HEADER (O "Crachá")
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const { data } = await axios.get('http://localhost:3000/corridas/resumo', config);
      setResumo(data);
    } catch (error) {
      console.error("Erro ao buscar resumo:", error);
    }
  };

  // Função para salvar nova corrida
  const salvarCorrida = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } }
      await axios.post('http://localhost:3000/corridas', {
        valor: Number(valor),
        combustivel: Number(combustivel),
      }, config);
      
      setValor(''); setCombustivel('')  // Limpa campos
      buscarDados(); // Atualiza os números na tela
    } catch (error) {
      alert("❌ Erro ao salvar corrida. Sessão expirada?", error);
    } 
  }

  useEffect(() => { if (token) buscarDados() }, [token])

  // --- RENDERIZAÇÃO DA TELA ---

  if (!token) {
    return (
      <div style={{ padding: '40px', maxWidth: '350px', margin: 'auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1>🚕 Ride Tracker</h1>

        {/* TELA DE LOGIN */}
        {tela === 'login' && (
          <div key="login-form">
            <h2>Login</h2>
            <form onSubmit={fazerLogin}>
              <input type="email" placeholder='E-mail' onChange={e => setEmail(e.target.value)} required style={inputStyle} />
              <input type="password" placeholder='Senha' onChange={e => setSenha(e.target.value)} required style={inputStyle} />
              <button type='submit' style={btnStyle}>Entrar</button>
            </form>
            <p style={{ marginTop: '20px' }}>
              Não tem conta? {' '}
              <button 
                onClick={() => setTela('cadastro')} 
                style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Cadastre-se aqui
              </button>
            </p>
          </div>
        )}

        {/* TELA DE CADASTRO */}
        {tela === 'cadastro' && (
          <div key="register-form">
            <h2>Cadastro</h2>
            <form onSubmit={fazerCadastro}>
              <input type="text" placeholder='Nome' onChange={e => setNome(e.target.value)} required style={inputStyle} />
              <input type="email" placeholder='E-mail' onChange={e => setEmail(e.target.value)} required style={inputStyle} />
              <input type="password" placeholder='Senha' onChange={e => setSenha(e.target.value)} required style={inputStyle} />
              <button type='submit' style={{ ...btnStyle, background: '#28a745' }}>Criar Minha Conta</button>
            </form>
            <p style={{ marginTop: '20px' }}>
              Já é cadastrado? {' '}
              <button 
                onClick={() => setTela('login')} 
                style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Voltar para o Login
              </button>
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Olá, {usuario?.nome} 👋</h3>
        <button onClick={logout} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>Sair</button>
      </header>


      {/* CARD DE RESUMO FINANCEIRO */}
      <div style={{ background: '#222', color: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '25px' }}>
        <p>Total Liquido <strong>R$ {resumo?.totalLiquido || '0.00'}</strong></p>
        <small>{resumo?.quantidadeDeCorridas} corridas regitradas</small>
      </div>

      <form onSubmit={salvarCorrida} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="number" placeholder='Valor' value={valor} onChange={e => setValor(e.target.value)} required style={inputStyle} />
        <input type="number" placeholder='Combustível' value={combustivel} onChange={e => setCombustivel(e.target.value)} required style={inputStyle} />
        <button type='submit' style={btnStyle}>Salvar Corrida</button>
      </form>
    </div>
  )
}

// Estilos rápidos
const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }
const btnStyle = { width: '100%', padding: '10px', background: '#000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }


export default App;