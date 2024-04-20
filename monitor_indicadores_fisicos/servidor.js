const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('Cliente conectado.');

    const interval = setInterval(() => {
        const heartRate = Math.floor(Math.random() * (120 - 60 + 1) + 60);
        const bloodPressure = Math.floor(Math.random() * (140 - 80 + 1) + 80);
        const data = {
            heartRate: heartRate,
            bloodPressure: bloodPressure
        };
        ws.send(JSON.stringify(data));
    }, 5000);

    ws.on('close', function close() {
        console.log('Cliente desconectado.');
        clearInterval(interval);
    });
});
