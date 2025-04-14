const express = require('express');
const app = express();
const port = 3000;

names = ['Hans', 'Peter', 'Anna', 'Maria', 'Klaus', 'Sophie', 'Lukas', 'Emma', 'Max', 'Lea', 'Paul', 'Julia', 'Jonas', 'Laura', 'Felix', 'Nina', 'Tim', 'Sarah', 'Leon', 'Mia'];


app.get('/now', (req, res) => {
    const now = new Date().toISOString();
    res.json({ uhrzeit: now });
});


app.get('/zli', (req, res) => {
    res.redirect('https://www.zli.ch');
});


app.get('/name', (req, res) => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    res.send(randomName);
});

app.get('/html', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Willkommen</title>
    </head>
    <body>
        <h1>Willkommen auf meiner Website!</h1>
        <p>Dies ist eine einfache Express.js-Anwendung mit mehreren Endpunkten.</p>
        <ul>
            <li><a href="/now">Aktuelle Uhrzeit</a></li>
            <li><a href="/zli">Zur ZLI-Website</a></li>
            <li><a href="/name">Zufälliger Name</a></li>
        </ul>
    </body>
    </html>
`;
    res.send(html);
});

app.get('/user-agent', (req, res) => {
    const userAgent = req.get('User-Agent');
    res.json({ 'user-agent': userAgent });
});

app.get('/secret', (req, res) => {
    res.status(403).send('Forbidden');
});

app.get('/xml', (req, res) => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <note>
        <to>Tove</to>
        <from>Jani</from>
        <heading>Reminder</heading>
        <body>Don't forget me this weekend!</body>
    </note>`;
    res.type('application/xml');
    res.send(xml);
});


app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});