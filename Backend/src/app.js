const express = require('express');
const cors = require('cors')
const app = express();

// 1. IMPORTAÇÃO DOS CONTROLADORES E MIDDLEWARES
const corridaController = require('./controllers/corridaController');
const authController = require('./controllers/authController')
const authMiddleware = require('./middlewares/authMiddleware')

// 2. CONFIGURAÇÕES (MIDDLEWARES GERAIS)
app.use(express.json()); // Faz o Express entender JSON no corpo das requisições
app.use(cors());         // Libera o acesso para o seu Frontend (React)

// --- ROTAS ---

// 3. ROTAS PÚBLICAS (Qualquer um acessa: Login e Cadastro
app.get('/', (req, res) => res.send("API Ride Tracker Online!"))
app.post('/auth/registrar', authController.registrar)
app.post('/auth/login', authController.login)

// 4. ROTAS PROTEGIDAS (Só acessa quem tem o Token JWT)
// O 'authMiddleware' protege todas as rotas de /corridas
app.use('/corridas', authMiddleware)


// Rota de Resumo (Deve vir ANTES das rotas com :id)
app.get('/corridas/resumo', corridaController.resumir);

// Rotas de CRUD
app.post('/corridas', corridaController.criar);
app.get('/corridas', corridaController.listarTodas);
app.get('/corridas/:id', corridaController.listaPorId);
app.put('/corridas/:id', corridaController.atualizar);
app.delete('/corridas/:id', corridaController.deletar);


module.exports = app;