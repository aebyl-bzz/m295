const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

const user1 = 'zli';
const pass = 'zli1234';

app.get('/public', (req, res) => {
    res.status(200).send('Dies ist der öffentliche Bereich.');
});

app.get('/private', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;


    if (username === user1 && password === pass) {
        res.status(200).send('Dies ist der private Bereich.');
    } else {
        res.status(401).send('Unauthorized: Falsche Zugangsdaten.');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});