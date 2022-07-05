
const express = require('express');
const path =  require('path');
require('dotenv').config();

// App Expres
const app = express();

// Node Server
const server = require('http').createServer(app); //app.callback()
module.exports.io = require('socket.io')(server); // se exporta el contenido al archivo socket.js (solo para separar)

// mensaje de sockets
require('./sockets/socket.js');





const publicPath = path.resolve( __dirname, 'public');

app.use(express.static(publicPath));


 server.listen(process.env.PORT, ( err) =>{  // esta linea se cambio de app.listen aserver.listen
    if ( err) throw Error(err);

    console.log('Servidor Corriendo en puerto:', process.env.PORT);




    
 })

//  http://localhost:3000/socket.io/socket.io.js este es la ruta que tiene el js q hace la interaccion a tiempo real server/cliente