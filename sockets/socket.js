
const {io} = require('../index'); // aca se importo io q tiene el valor desde index.js

//mensajes o comnunicacion del sckets
io.on('connection', client => {
    console.log('Cliente conectado')
    
    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });

    client.on('mensaje', (payload) =>{ // aca es donde el servidor escucha lo mandado por la aplicacion
        console.log('Mensaje !!!!', payload);

        io.emit('mensaje',{admin: 'Nuevo Mensaje '})  ;   // el servidor emite un msj a todos los clientes

    }) // on es q va a estar escuchando

  });