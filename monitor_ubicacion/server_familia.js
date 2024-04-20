
const WebSocket = require('ws');
const PORT = 8080;; 
const wss = new WebSocket.Server({ port: PORT });
const conductores = [];
const empresas = [];
const familiares = [];
wss.on('connection', (ws, req) => {
   
    const tipo_usuario= 'conductor'
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
    console.log('Cliente conectado');

    ws.on('message', (message) => {
        const mensajestr = message.toString();
        console.log('Mensaje recibido desde el cliente:', mensajestr);
        if (mensajestr === 'accidente') {
            console.log('¡Accidente!');
        } 
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });

    ws.on('error', (error) => {
        console.error('Error en la conexión :', error.message);
    });
});

console.log(`Servidorescuchando en el puerto ${PORT}|`)