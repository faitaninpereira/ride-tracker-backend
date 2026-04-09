import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  // Estados para dados do banco e inputs do usuário
  const [resumo, setResumo] = useState(null);
  const [valor, setValor] = useState('');
  const [combustivel, setCombustivel] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Função para buscar dados do Backend
  const buscarDados = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/corridas/resumo');
      setResumo(data);
    } catch (error) {
      console.error("Erro ao buscar resumo:", error);
    }
  };

  // Função para salvar nova corrida
  const handlesubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);

    try {
      await axios.post('http://localhost:3000/corridas', {
        valor: Number(valor),
        combustivel: Number(combustivel),
        plataforma: "Uber"
      });
      
      alert("✅ Corrida salva com sucesso!");
      setValor(''); // Limpa campos
      setCombustivel('');
      buscarDados(); // Atualiza os números na tela
    } catch (error) {
      alert("❌ Erro ao salvar corrida. Verifique o console.", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { buscarDados(); }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>🚕 Ride Tracker</h1>

      {/* CARD DE RESUMO FINANCEIRO */}
      <div style={{ background: '#1a1a1a', color: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '25px' }}>
        <h3 style={{ marginTop: 0 }}>Meu Desempenho</h3>
        {resumo ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <small>Viagens</small>
              <p style={{ fontSize: '1.2rem', margin: '5px 0' }}>{resumo.quantidadeDeCorridas}</p>
            </div>
            <div>
              <small>Lucro Líquido</small>
              <p style={{ fontSize: '1.2rem', margin: '5px 0', color: '#4caf50' }}>R$ {resumo.totalLiquido}</p>
            </div>
          </div>
        ) : <p>Carregando painel...</p>}
      </div>

      {/* FORMULÁRIO DE ENTRADA */}
      <form onSubmit={handlesubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>
          Valor Recebido (R$)
          <input 
            type="number" step="0.01" required 
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            value={valor} onChange={(e) => setValor(e.target.value)}
          />
        </label>
        
        <label>
          Gasto com Combustível (R$)
          <input 
            type="number" step="0.01" required 
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            value={combustivel} onChange={(e) => setCombustivel(e.target.value)}
          />
        </label>

        <button 
          type="submit" 
          disabled={carregando}
          style={{ 
            padding: '12px', background: '#000', color: '#fff', 
            border: 'none', borderRadius: '5px', cursor: 'pointer' 
          }}
        >
          {carregando ? 'Salvando...' : 'Registrar Corrida'}
        </button>
      </form>
    </div>
  );
}

export default App;