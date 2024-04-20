
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function () {
    console.log('Conectado al servidor.');
};

ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    console.log("Datos recibidos:", data); 
    updateIndicators(data);
    checkForAnomaly(data);
};

ws.onclose = function () {
    console.log('Desconectado del servidor.');
};

function updateIndicators(data) {
    document.getElementById("heartRate").innerHTML = "Frecuencia cardíaca: " + data.heartRate;
    document.getElementById("bloodPressure").innerHTML = "Presión arterial: " + data.bloodPressure;
}

function checkForAnomaly(data) {
    let message = '';
    if (data.heartRate > 100) {
        message += 'Frecuencia cardíaca alta. ';
    }
    if (data.bloodPressure > 120) {
        message += 'Presión arterial alta. ';
    }
    if (message !== '') {
        const alertMessage = 'Se han detectado las siguientes anomalías: ' + message;
        displayAlert(alertMessage);
    }
}

function displayAlert(message) {
    document.getElementById("alertMessage").innerHTML = message;
    document.getElementById("alertBox").style.display = "block";
}

function closeAlert() {
    document.getElementById("alertBox").style.display = "none";
}
