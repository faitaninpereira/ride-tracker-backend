const mongoose = require('mongoose');

const CorridaSchema = new mongoose.Schema({
  // Se você tiver "motorista" ou "distancia" como required: true, o erro 400 acontece.
  // Vamos deixar apenas o que estamos enviando agora como obrigatório:
  valor: { 
    type: Number, 
    required: true 
  },
  combustivel: { 
    type: Number, 
    required: true 
  },
  plataforma: { 
    type: String, 
    default: 'Uber' 
  },
  data: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Corrida', CorridaSchema);