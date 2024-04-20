
const http = require('http');
const express = require('express');
const bunyan = require('bunyan');
const WebSocket = require('ws');
const bodyParser = require('body-parser'); ///
const app = express();
const server = http.createServer(app);
const log = bunyan.createLogger({ name: 'DIRECCIONES' });
const PORT = 4230;


const wss = new WebSocket.Server({ server });



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(PORT, () => {
    log.info(`Servidor en ejecución en el puerto ${PORT}`);
});

wss.on('connection', (ws) => {
    log.info('Cliente conectado DIRECCIONES');
    ws.on('message', async (message) => {
        log.info(`Mensaje recibido: ${message}`);

        // Enviar un mensaje de vuelta al cliente
        ws.send(`Mensaje recibido: ${message}`);

    });
    ws.on('close', () => {
        log.info('Cliente desconectado');
    });
});


// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send('prueba');
});

// prueba?
app.post('/search', async (req, res) => {

    if (req.body.destination && req.body.origin) {

        console.log(req.body.destination);
        console.log(req.body.origin);

        
        let destination = req.body.destination;
        let origin = req.body.origin;
        let buscar = await search(origin,destination);
        res.send(buscar);
        sendMessage(buscar);
        return;
    }
    
    res.status(400);
    res.send();
});



// 

async function search(origin,destination) {

    origin = encodeURIComponent(origin);
    origin = encodeURIComponent(destination);

    const apiKey = 'eliminada';
    let url = `https://maps.googleapis.com/maps/api/directions/json?destination=${destination}&origin=${origin}&key=${apiKey}`;

    console.log('entro a l funcion')
    const response = await fetch(url, {
        method: 'GET',

        });
        
        if (!response.ok) {
            console.log(response.status)
            throw new Error('Hubo un problema al realizar la solicitud.');
        }
    
        const data = await response.json();
        return data;

}


//////// SOCKET


const ws = new WebSocket('http://localhost:3000');



ws.addEventListener('open', () => {
    console.log('Conectado al servidor BUSCADOR');
});

ws.addEventListener('message', async (event) => {
    
    console.log('\t\t\t\nevent data:direcciones : =>'+event.data+"-=====")


    let lugaresCompletas = JSON.stringify(event.data);
    let lugares = JSON.stringify(event.data)[0];
    console.log(lugaresCompletas)
    console.log('\n\n'+lugares+'\n\n')
    

    // let lugaresCompletas = event.data;

    // console.log(lugaresCompletas)

    // let lugares = JSON.parse(event.data).places;
    // console.log(`Mensaje recibido__: ${event.data.toString()}`);
    // console.log(lugares[0].formattedAddress+"----==");

    // console.log(lugaresCompletas.origin);
    let direcciones = await search(lugaresCompletas.origin,lugares[0].formattedAddress);

    console.log('\n\n'+JSON.stringify(direcciones)+'\n\n')


    console.log('chocolate')
    wss.clients.forEach(client=>{
        if(client.readyState === WebSocket.OPEN){
            console.log('se envia a: '+client.url)
            client.send(JSON.stringify(direcciones));
            
        }
    });
});

ws.addEventListener('close', () => {
    console.log('Desconectado del servidor WebSocket');
});


function sendMessage(message) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
        console.log(`Mensaje enviado: ${message}`);
    } else {
        console.log('No se pudo enviar el mensaje. WebSocket no está abierto.');
    }
}


