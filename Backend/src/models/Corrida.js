const mongoose = require('mongoose');

const CorridaSchema = new mongoose.Schema({
  // Vinculamos a corrida ao ID de um usuário do MongoDB
  usuario: {
    Type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
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
    enum: ['Uber', '99', 'Particular'], default: 'Uber'
  },
  data: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Corrida', CorridaSchema);