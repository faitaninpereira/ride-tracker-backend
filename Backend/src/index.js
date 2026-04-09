require('dotenv').config()

const mongoose = require('mongoose')
const app= require('./app')

const PORTA= 3000

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log( "✅ Conectado ao MongoDB com sucesso!" )
    
         app.listen(PORTA, ()=> {
            console.log(`🚀 Servidor rodando em: http://localhost: ${PORTA}`)
        })
    }) 
    .catch(err => console.error( "❌ Erro ao conectar no MongoDB:", err ))