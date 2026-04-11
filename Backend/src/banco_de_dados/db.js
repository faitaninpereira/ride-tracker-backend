const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {

    try {
        // O process.env.MONGO_URI deve estar certinho no seu arquivo .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB conectado com sucesso!");
    } catch (err) {
        console.error("❌ Erro ao conectar no banco:", err.message);
        process.exit(1); // Fecha o app se o banco não conectar
    }
};

module.exports = connectDB