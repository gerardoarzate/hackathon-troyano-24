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
      
        familiares.forEach((familiar) => {
            familiar.send(mensajestr); 
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
   



