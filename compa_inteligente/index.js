const WebSockets = require('ws');
const OpenAI = require('openai');
const port = 50001;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const wsServer = new WebSockets.Server({ port: port });

wsServer.on('connection', (ws) => {

    const token = { idUsuario: 1, tipo: 'conductor' };

    if (token.tipo != 'conductor') {
        ws.close();
        return;
    }

    ws.on('message', (async data => {
        const str = data.toString();
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', 'content': str }],
            model: 'gpt-4'
        });

        const response = completion.choices[0].message.content;
        console.log(response);
        ws.send(response);
    }));

});

console.log(`Listening on ws port ${port}`);