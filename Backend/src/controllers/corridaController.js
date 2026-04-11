const Corrida = require('../models/Corrida');

const corridaController = {

  // 1. Criar uma nova corrida
  criar: async (req, res) => {
    try {
      // Pegamos os dados do corpo e o ID do usuário que o middleware achou no token
      const novaCorrida = new Corrida({
        ...req.body,
      usuario: req.usuario.id
    });
      const corridaSalva = await novaCorrida.save();
      res.status(201).json(corridaSalva);
    } catch (erro) {
      res.status(400).json({ mensagem: "Erro ao salvar corrida", erro: erro.message });
    }
  },

  // 2. Listar todas as corridas
  listarTodas: async (req, res) => {
    try {
      const corridas = await Corrida.find().sort({ data: -1 }); // Mostra as mais recentes primeiro
      res.json(corridas);
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao buscar corridas", erro: erro.message });
    }
  },

  // 3. Buscar resumo financeiro (A "Lógica de Ouro")
  resumir: async (req, res) => {
    try {

      // IMPORTANTE: Agora buscamos apenas as corridas do usuário logado!
      const corridas = await Corrida.find({ usuario: req.usuario.id });

      let totalGanhos = 0;
      let totalGastos = 0;

      corridas.forEach(c => {
        totalGanhos += (c.valor || 0);
        totalGastos += (c.combustivel || 0);
      });

      res.json({
        quantidadeDeCorridas: corridas.length,
        totalAcumulado: totalGanhos.toFixed(2),
        totalCombustivel: totalGastos.toFixed(2),
        totalLiquido: (totalGanhos - totalGastos).toFixed(2),
        mensagem: "Resumo calculado com sucesso."
      });
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao calcular resumo", erro: erro.message });
    }
  },

  // 4. Buscar por ID
  listaPorId: async (req, res) => {
    try {
      const corrida = await Corrida.findById(req.params.id);
      if (!corrida) return res.status(404).json({ mensagem: "Corrida não encontrada" });
      res.json(corrida);
    } catch (erro) {
      res.status(400).json({ mensagem: "ID inválido" });
    }
  },

  // 5. Atualizar corrida
  atualizar: async (req, res) => {
    try {
      const corridaAtualizada = await Corrida.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true } // Retorna o objeto já atualizado
      );
      res.json(corridaAtualizada);
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao atualizar", erro: erro.message });
    }
  },

  // 6. Deletar corrida
  deletar: async (req, res) => {
    try {
      await Corrida.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao deletar", erro: erro.message });
    }
  }
};

module.exports = corridaController;