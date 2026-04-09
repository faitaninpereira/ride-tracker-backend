const express = require('express');
const cors = require('cors');
const app = express();
const corridaController = require('./controllers/corridaController');

// Middlewares
app.use(express.json()); // Faz o Express entender JSON no corpo das requisições
app.use(cors());         // Libera o acesso para o seu Frontend (React)

// --- ROTAS ---

// Rota de Teste
app.get('/', (req, res) => res.send("Servidor Online!"));

// Rota de Resumo (Deve vir ANTES das rotas com :id)
app.get('/corridas/resumo', corridaController.resumir);

// Rotas de CRUD
app.post('/corridas', corridaController.criar);
app.get('/corridas', corridaController.listarTodas);
app.get('/corridas/:id', corridaController.listaPorId);
app.put('/corridas/:id', corridaController.atualizar);
app.delete('/corridas/:id', corridaController.deletar);

module.exports = app;