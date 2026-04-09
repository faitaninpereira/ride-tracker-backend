const Corrida = require('../models/Corrida')

// Aqui criamos um objeto que exporta nossas funções (nossas "receitas")
const corridaController = {

    //Lógica para Criar
    criar: async (req, res) => {
        try {
            const novaCorrida = new Corrida(req.body)
            const corridaSalva = await novaCorrida.save()
            res.status(201).json(corridaSalva)
        } catch (erro) {
            res.status(400).json({ mensagem: "Erro ao salvar", erro: erro.message })
        }
    },

    //Lógica para Listar Tudo
    listarTodas: async (req, res) => {
        try {
            const corridas = await Corrida.find()
            res.json(corridas)
        } catch (erro) {
            res.status(500).json({ mensagem: "Erro ao buscar", erro: erro.message })
        }
    },

    //Lógica para buscar por ID
    listaPorId: async (req, res) => {
        try {
            const idBuscado = req.params.id
            const buscarCorrida = await Corrida.findById(idBuscado)

            if (!buscarCorrida) {
                return res.status(404).json({ mensagem: "Corrida não encontrada!" })
            }

            res.json(buscarCorrida)

        } catch (erro) {
            res.status(400).json({ mensagem: "ID informado é inválido!" })
        }
    },

    // Lógica para atualizar
    atualizar: async (req, res) => {
        try {
            const idBuscado = req.params.id
            const { motorista, valor, distancia, combustivel, plataforma } = req.body

            const corrida = await Corrida.findById(idBuscado)

            if (!corrida) {
                return res.status(400).json({ mensagem: "Corrida não encontrada para atualização!" })
            }

            if (motorista) corrida.motorista = motorista
            if (valor) corrida.valor = Number(valor)
            if (distancia) corrida.distancia = distancia
            if (combustivel) corrida.combustivel = Number(combustivel)
            if (plataforma) corrida.plataforma = plataforma

            const corridaAtualizada = await corrida.save()

            console.log(`Corrida ${idBuscado} atualizada no MongoDB`)

            res.json(corridaAtualizada)

        } catch (erro) {
            res.status(500).json({ mensagem: "Erro ao atualizar!", erro: erro.message })
        }
    },

    // Lógica para deletar
    deletar: async (req, res) => {
        try {
        const idBuscado = req.params.id
        const corridaDeletada = await Corrida.findByIdAndDelete(idBuscado)

        if (!corridaDeletada) {
            return res.status(404).json({ mensagem: "Corrida não encontrada!", erro: erro.message })
        }

        console.log(`Corrida ${idBuscado} removida do MongoDB`)

        res.status(204).send()

        } catch (erro) {
            res.status(500).json({ mensagem: "Erro ao deletar!", message: erro.message })
        }
    },

    resumir: async (req, res) => {
        try {
            const corridas = await Corrida.find()

            let totalGanhos = 0
            let totalGastos = 0

            corridas.forEach(c => {
                totalGanhos += c.valor
                totalGastos += (c.combustivel || 0) // O || 0 evita erros se o campo estiver vazio
            })
            
            res.json({
                quantidadeDeCorridas: corridas.length,
                totalAcumulado: totalGanhos,
                totalCombustivel: totalGastos,
                totalLiquido: totalGanhos - totalGastos,
                mensagem: "Resumo atualizado em tempo real com o MongoDB."
            })
        } catch (erro) {
            res.status(500).json({ mensagem: "Erro ao calcular resumo", erro: erro.message })
        }
    }
}

module.exports = corridaController