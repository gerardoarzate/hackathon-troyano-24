const WebSocket = require('ws');
const PORT = 3000;
const wss = new WebSocket.Server({ port: PORT });
const conductores = [];
const empresas = [];
const familiares = [];

wss.on('connection', (ws, req) => {
    const tipo_usuario = req.url.split('/')[1];
    switch (tipo_usuario) {
        case 'conductor':
            conductores.push(ws);
            break;
        case 'empresa':
            empresas.push(ws);
            break;
        case 'familiar':
            familiares.push(ws);
            break;
        default:
            break;
    }
    console.log(`Cliente conectado: ${tipo_usuario}`);

    ws.on('message', (message) => {
    const mensajestr = message.toString();
    console.log('Mensaje recibido desde el cliente:', mensajestr);
    if (mensajestr === 'accidente') {
        console.log('¡Accidente!');
    } else {
        // Si el mensaje no es un accidente, asumimos que es la posición del conductor
        // Enviamos la posición a todos los clientes familiares conectados
        familiares.forEach((familiar) => {
            familiar.send(mensajestr); // Enviamos la posición tal como la recibimos del conductor
        });
    }
});


    ws.on('close', () => {
        console.log(`Cliente desconectado: ${tipo_usuario}`);
    });

    ws.on('error', (error) => {
        console.error(`Error en la conexión con ${tipo_usuario}:`, error.message);
    });
});

console.log(`Servidor escuchando en el puerto ${PORT}`);
   



//distribuir para los familiares y empresa 
//servidor acepte conexiones por ws y ahora en lugar de recibir enviar 
// teenr el formato JWT para saber que mandar 

// detectar el tipo de usario con JWT 
    //variable 
   
    //switch para cada caso 
    //3 funciones para manejara cada caso con el tipo de conexión a estas funciones 
    /*les pasamos el ws
    ws se le mando el pa ya pa aca 
    a cada funcion se le añaden los eventos 
    manejar conductor, m emp, m familiar
    en esa funcion se ponen los eventos y asi optenemos varios tipos de conexión
    3 arreglos uno para almacenar cada tipo de conexion --
    ws.id = number
    
    */