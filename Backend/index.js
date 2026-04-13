require('dotenv').config(); // Carrega as variáveis do .env
const app = require('./src/app');
const connectDB = require('./src/banco_de_dados/db')

const PORT = 3000;

const iniciarServidor = async () => {
    try {
        await connectDB() // Aguarda a conexão com o MongoDB
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("Falha ao iniciar o servidor:", error)
    }
}

iniciarServidor()