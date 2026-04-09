require('dotenv').config(); // Carrega as variáveis do .env
const mongoose = require('mongoose');
const app = require('./app');
const PORT = 3000;

// Conexão com o MongoDB usando a variável de ambiente
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado ao MongoDB com sucesso!");
    app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
  })
  .catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));