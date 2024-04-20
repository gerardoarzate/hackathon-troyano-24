const date = new Date();
const hours = date.getHours();
const min = date.getMinutes().lenght > 1 ? date.getMinutes() : `0${date.getMinutes()}`;

const getMessageForAssistant = () => {
    return (
        `Soy un conductor que se encuentra conduciendo un vehículo cargado hasta el norte del país.
        Tu eres mi asistente, tu trabajo consiste en aconsejarme y apoyarme para que pueda cumplir con mi entrega en tiempo y forma,
        considerando que la seguridad y bienestar físico y emocional deben ser una prioridad en mi profesión. Tu mensaje debe ser breve y amigable.
        Te comparto los siguientes datos sobre mi viaje en este momento:
        Hora actual: ${hours}:${min} (formato 24hrs)
        Ubicación actual: Juriquilla
        Velocidad media en la última hora: 100km/hr
        Tiempo transcurrido desde el inicio del viaje: 12 horas
        Tiempo desde el último descanso: 6 horas`
    );
};

export default getMessageForAssistant;