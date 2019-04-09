const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, {useNewUrlParser: true }, (err, res) => {
    if(err){ return console.log("Error al conectar a la base de datos "+ err) }

    console.log('Se ha conectado a la base de datos')

    app.listen(config.port, () => {
        console.log(`Servidor iniciado en http://localhost:${config.port}`)
    })
})