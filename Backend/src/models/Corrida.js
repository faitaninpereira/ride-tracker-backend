const mongoose= require('mongoose')

// O Schema define a "cara" do nosso dado
const CorridaSchema = new mongoose.Schema ({
    motorista: String,
    valor: { type: Number, required: true },
    distancia: { type: Number, required: true },
    combustivel: { type: Number, required: true },
    plataforma: String,
    data: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Corrida', CorridaSchema)