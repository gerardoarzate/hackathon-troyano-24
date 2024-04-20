const url = 'ws://localhost:50001';

class AsistantHandler {
    constructor() {
        const ws = new WebSocket(url);
        this.socket = ws;

        ws.addEventListener('open', (ev) => {
            console.log('Connection with IA Assistant opened succesfully');
        });

        ws.addEventListener('message', (ev) => {
            window.showMessage(ev.data);
        });
    }

    askAssistant(data) {
        this.socket.send(data);
    }
}

export default AsistantHandler;