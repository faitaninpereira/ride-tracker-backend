const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authController = {
    // REGISTRO: Cria um novo motorista
    registrar: async (req, res) => {
        try {
            const { nome, email, senha } = req.body

            // Verifica se o e-mail já existe
            const usuarioExistente =  await Usuario.findOne({ email })
            if (usuarioExistente) 
                return res.status(400).json({ mensagem: "E-mail já cadastrado!" })

            // Criptografa a senha (Segurança nível bancário)
            const salt = await bcrypt.genSalt(10)
            const senhaCriptografada = await bcrypt.hash(senha, salt)

            const novoUsuario = new Usuario({
                nome, 
                email, 
                senha: senhaCriptografada
            })

            await novoUsuario.save()
            res.status(201).json({ mensagem: "Sucesso ao registrar" })

        } catch (erro) {
            res.status(500).json({ mensagem: "Erro ao registrar", erro: erro.message })
        }
    },

    //LOGIN: Valida o acesso e entrega "Token" (o crachá)
    login: async (req, res) => {
        try {
            const { email, senha } = req.body

            // Busca o usuário
            const usuario = await Usuario.findOne({ email })
            if (!usuario) 
                return res.status(400).json({ mensagem: "E-mail ou senha incorretos!" })

            // Validando Senha
            const senhaValida = await bcrypt.compare(senha, usuario.senha)
            if (!senhaValida)
                return res.status(400).json({ mensagem: "E-mail ou senha incorretos!" })

            // Gera o Token KWT (válido por 1 dia)
            const token = jwt.sign(
                { id: usuario._id },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            )

            res.json({
                token,
                usuario: { id: usuario._id, nome: usuario.nome }
            })

        } catch (erro) {
            res.status(500).json({ mensagem: "Erro no login", erro: erro.message })
        }
    }
}

module.exports = authController