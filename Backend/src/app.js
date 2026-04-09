const cors = require('cors')

const express= require('express')
const app= express()
const corridaController = require('./controllers/corridaController') // Importa o "Cozinheiro"

// 1. Configuração: Faz o Express entender o que você envia no corpo (body) do POST
app.use(express.json())
app.use(cors())


// ROTA PRINCIPAL: Só para saber se o servidor está vivo
app.get('/', (req, res) => {
    res.send("Servidor do Ride Tracker está online!")
})

console.log(">>> O ARQUIVO APP.JS FOI CARREGADO COM SUCESSO! <<<")

// ROTA DE CRIAÇÃO (POST): Aqui o motorista "envia" os dados para o servidor
app.post('/corridas', corridaController.criar)


// ROTA DE LISTAGEM (GET): Mostra TODAS as corridas que estão na lista
app.get('/corridas', corridaController.listarTodas)



// ROTA DE BUSCA POR ID: O ':id' é uma variável na URL
app.get('/corridas/:id', corridaController.listaPorId)



// ROTA DE ATUALIZAÇÃO (PUT)
app.put('/corridas/:id', corridaController.atualizar)



// ROTA DE EXCLUSÃO (DELETE)
app.delete('/corridas/:id', corridaController.deletar)



// ROTA DE RESUMO (GET): Onde a "Lógica de Júnior" acontece (Soma dos ganhos)
app.get('/resumo', corridaController.resumir)



// 4. Exportação: Deixa o servidor pronto para o index.js ligar
module.exports= app