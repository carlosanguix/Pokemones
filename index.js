// Imports
const express = require('express');
const path = require('path');

// Configuraciones
const app = express();
const port = process.env.port || 3003;

// Servicio al cliente /public
app.use(express.static(path.join(__dirname, 'public')));

// Arrancando el servidor
app.listen(port, () => {
    console.log(' * Servidor escuchando en el puerto ' + port);
});
