// Imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

// Configuraciones
const app = express();
const port = process.env.port;
app.use(bodyParser.json())

// Servicio al cliente /public
app.use(express.static(path.join(__dirname, 'public')));



// Arrancando el servidor
app.listen(port, () => {
    console.log(' * Servidor escuchando en el puerto ' + port);
});
