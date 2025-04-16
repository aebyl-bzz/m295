require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const USER = process.env.USER;
const PASS = process.env.PASS;

app.get('/public', (req, res) => {
    res.send('Öffentliche Seite – keine Anmeldung nötig.');
});

app.get('/private', (req, res) => {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith('Basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('Login erforderlich');
    }

    const base64 = auth.split(' ')[1];
    const decoded = Buffer.from(base64, 'base64').toString('utf8');
    const [username, password] = decoded.split(':');

    if (username === USER && password === PASS) {
        res.send('Willkommen im privaten Bereich!');
    } else {
        res.status(401).send('Zugriff verweigert: Falsche Zugangsdaten');
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
