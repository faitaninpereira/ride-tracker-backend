require('dotenv').config(); // Carrega as variáveis do .env
const mongoose = require('mongoose');
const app = require('./src/app');
const connectDB = require('./src/banco_de_dados/db')

const PORT = 3000;

// 1. Primeiro conecta ao Banco
connectDB().then(() => {
    // 2. Só depois de conectar, o servidor "abre as portas"
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
});