import './Map.css';

const Map = () => {
    return (
        <iframe
            width="600"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=[API_KEY]&q=Centro-de-negocios-UAQ-Juriquilla">
        </iframe>
    );
}

export default Map;