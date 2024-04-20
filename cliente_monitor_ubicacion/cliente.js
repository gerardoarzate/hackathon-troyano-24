const socket = new WebSocket('ws://localhost:3000');


socket.onclose = function () {
    console.log('Conexión WebSocket cerrada');
};

socket.onerror = function (error) {
    console.error('Error en la conexión WebSocket:', error.message);
};
function reportarAccidente() {
    const mensaje = 'accidente';
    socket.send(mensaje);
}
function startTracking() {
    enviarUbicacionServidor();
    trackingIntervalId = setInterval(enviarUbicacionServidor, 5000);
}

function stopTracking() {
    clearInterval(trackingIntervalId);
}

function enviarUbicacionServidor() {
    navigator.geolocation.getCurrentPosition(function (position) {
        const ubicacion = {
            latitud: position.coords.latitude,
            longitud: position.coords.longitude
        };

        const mensaje = JSON.stringify(ubicacion);
        socket.send(mensaje);
    });
}
