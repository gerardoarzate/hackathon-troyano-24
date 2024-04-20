const express = require('express');
const bunyan = require('bunyan');
const bodyParser = require('body-parser'); ///
const log = bunyan.createLogger({ name: 'myapp' });
const app = express();
const PORT = 4200;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
    log.info(`Servidor en ejecución en el puerto ${PORT}`);
});
// Manejador de errores
app.use((err, req, res, next) => {
    log.error(err, 'Error processing request');
    res.status(500).send('Algo salió mal');
});



// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send('Hola, mundo!');
});

app.post('/search', async (req, res) => {

    if (req.body.latitud && req.body.longitud) {
        
        let latitud = req.body.latitud;
        let longitud = req.body.longitud;
        let text = req.body.text;
        let buscar = await search(text,latitud,longitud);
        res.send(buscar);
        return;
    }
    
    res.status(400);
    res.send();
});



/////////


async function search(text,latitud,longitud) {
    const url = 'https://places.googleapis.com/v1/places:searchText';
    console.log('entro a l funcion')
    console.log(text)
    console.log(latitud)
    console.log(longitud)
    let body = {
        textQuery: text,
        locationBias: {
            "circle": {
              "center": {
                "latitude": latitud,
                "longitude": longitud
              },
              "radius": 500.0
            }
          }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': 'eliminada',
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel'
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
