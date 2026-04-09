const app= require('./app')

const PORTA= 3000

app.listen(PORTA, ()=> {
    console.log(`🚀 Servidor rodando em: http://localhost: ${PORTA}`)
})