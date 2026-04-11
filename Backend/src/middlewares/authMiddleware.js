const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // 1. Pega o token que vem no cabeçalho (header) da requisição
    const token = req.header('Authorization')

    // 2. Se não tiver token, barra a entrada
    if (!token) {
        return res.status(401).json({ mensagem: "Acesso negado. Faça login primeiro." })
    }

    try {
        // 3. Tenta validar o token usando a sua chave secreta do .env
        // o token geralmente vem como "Bearer <token>", então removemos o "Bearer " se existir
        const tokenLimpo = token.replace('Bearer ', '')
        const verificado = jwt.verify(tokenLimpo, process.env.JWT_SECRET)

        // 4. Adiciona os dados do usuário logado dentro da requisição (req.usuario)
        req.usuario = verificado

        // 5. Libera para a próxima função (o controller)
        next()

    } catch (erro) {
        res.status(400).json({ mensagem: "Token inválido ou expirado." })
    }
}