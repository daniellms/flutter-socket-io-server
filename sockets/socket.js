
const {io} = require('../index'); // aca se importo io q tiene el valor desde index.js
const Band = require('../modelos/band');
const Bands = require('../modelos/bands');

const bands = new  Bands;

bands.addBand(new Band('Mix') );
bands.addBand(new Band('Banda D') );
bands.addBand(new Band('Frendship') );
bands.addBand(new Band('Cancion para elisa') );

console.log(bands);
// este archivo hace las interacciones con los cliente emite y escucha
//http://192.168.0.197:3000
//mensajes o comnunicacion del sckets
// IO es el servidor, todos los clientes conectados estan ahi 
    // io.emit (manda a todos inclusive al mismo cliente q hizo la solicitud)

io.on('connection', client => {
    console.log('Cliente conectado')
    
    client.emit('active-bands',  bands.getBands());
    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });


    client.on('mensaje', (payload) =>{ // aca es donde el servidor escucha lo mandado por la aplicacion
        // console.log('Mensaje !!!!', payload);

        io.emit('mensaje',{admin: 'Nuevo Mensaje '})  ;   // el servidor emite un msj a todos los clientes
        // client.broadcast.emit('emitir-mensaje', payload);    // servidor EMITE a todos los clientes EXEPTO a quien hizo la peticion
    });// on es q va a estar escuchando
    

    // io.emit('nuevo-mensaje', payload);
    client.on('emitir-mensaje', (payload) => { 
        // console.log(payload);// amtes de ejecutar client.emit, podemos ver si trar antes solo al servidor con consol.log
        //  io.emit('mensaje',{admin: 'Nuevo Mensaje '})  ; // servidor EMITE  a todos los clientes inclusive a quien hizo la peticion
         client.broadcast.emit('emitir-mensaje', payload); // servidor EMITE a todos los clientes EXEPTO a quien hizo la peticion
        //
    });

    client.on('vote-band', (payload) => { //  client.on escucha
        // console.log(payload)
        bands.voteBand(payload.id);
        io.emit('active-bands',  bands.getBands());    // actualizo a todos los clientes
    }) ;

    // escuchar: add-band
    client.on('add-band', (payload) => { //  client.on escucha
        // console.log(payload)
        const newBand = new Band(payload.nombre);
        bands.addBand(newBand);
        io.emit('active-bands',  bands.getBands());    // actualizo a todos los clientes
    }) ;

    client.on('delete-band', (payload) => { //  client.on escucha
        // console.log(payload.id)
         bands.deleteBand(payload.id);
         io.emit('active-bands',  bands.getBands());    // actualizo a todos los clientes
    }) ;


    //delete-band  //esto ya esta bands.deleteBand

    // client.on('active-bands', (payload) => { 
    //     // console.log(payload);// amtes de ejecutar client.emit, podemos ver si trar antes solo al servidor con consol.log
    //      // servidor EMITE  a todos los clientes inclusive a quien hizo la peticion
    //      client.broadcast.emit('emitir-mensaje', payload); // servidor EMITE a todos los clientes EXEPTO a quien hizo la peticion
    //     //
    // })
    

  });