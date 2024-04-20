
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bunyan = require('bunyan');
const bodyParser = require('body-parser'); ///
const log = bunyan.createLogger({ name: 'BUSCADOR' });
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;
server.listen(PORT, () => {
    log.info(`Servidor escuchando en el puerto ${PORT}`);
});

wss.on('connection', (ws) => {
    log.info('Cliente conectado');

    ws.on('message', (message) => {
        log.info(`Mensaje recibido: ${message}`);

        // Enviar un mensaje de vuelta al cliente
        ws.send(`Mensaje recibido: ${message}`);
    });

    ws.on('close', () => {
        log.info('Cliente desconectado');
    });
});


app.get('/prueba',(req,res)=>{
    res.send('<h1>Prueba</h1>')
});

// principal
app.post('/buscar',async (req,res)=>{

    console.log('si paso')

    if(req.body.text && req.body.latitud && req.body.longitud){

        

        let text =  req.body.text;
        let latitud = req.body.latitud;
        let longitud = req.body.longitud;

        let lugares = await lugaresRequest(text,latitud,longitud);
        console.log(latitud+'   __   '+longitud)
        lugares.origin = latitud+','+longitud;

        console.log(lugares)


        wss.clients.forEach(client=>{
            if(client.readyState === WebSocket.OPEN){
                console.log(lugares);
                client.send(JSON.stringify(lugares));
                console.log('se mandó el texto del buscador')
            }
        })
        
        res.send('<h1>Remplazar con el contenido obtenido de microservicio Direcciones')
    } 
    res.status(400);
    res.send();
})




async function lugaresRequest(text,latitud,longitud){

    const url = 'http://localhost:4200/search';
    

    let body = {
        text: text,
        latitud:latitud,
        longitud:longitud
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'X-Goog-Api-Key': 'eliminada',
            // 'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel'
        },
        body: JSON.stringify(body)
        });
        
        
        if (!response.ok) {
            console.log(response.status)
            throw new Error('Hubo un problema al realizar la solicitud.');
        }
        
        const data = await response.json();
        return data;
}




// para el servidor (como cliente)?
// function sendMessage(message) {
//     if (ws.readyState === WebSocket.OPEN) {
//         ws.send(message);
//         console.log(`Mensaje enviado: ${message}`);
//     } else {
//         console.log('No se pudo enviar el mensaje. WebSocket no está abierto.');
//     }
// }

