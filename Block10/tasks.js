const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { verify } = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

const SECRET = 'geheimesPasswort123';

let tasks = [
    {
        id: 0,
        title: "Task 1",
        description: "Description 1"
    },
    {
        id: 1,
        title: "Task 2",
        description: "Description 2"
    },
    {
        id: 2,
        title: "Task 3",
        description: "Description 3"
    }
];

const email = 'admin';
const pw = 'm295';
isLoggedIn = false;

function verifyToken(req, res, next) {
    const token = req.cookies.auth_token;

    if (!token) return res.status(401).json({ error: 'Kein Token vorhanden' });

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Ungültiger Token' });
        req.user = user;
        next();
    });
}

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Titel und Beschreibung sind erforderlich' });
    }
    const newTask = { title, description };
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    res.status(201).send(newTask);
});

app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Ungültige ID' });

    const foundTask = tasks.find((task) => task.id === id);
    if (foundTask) {
        res.send(foundTask);
    } else {
        res.status(404).json({ error: 'Task ID nicht gefunden' });
    }
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Ungültige ID' });

    const taskIndex = tasks.findIndex((task) => task.id === id);
    const newTask = req.body;
    if (!newTask.title && !newTask.description) {
        return res.status(400).json({ error: 'Es muss mindestens ein Feld (title oder description) angegeben werden' });
    }
    newTask.id = id;

    if (taskIndex >= 0) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...newTask };
        res.send(tasks[taskIndex]);
    } else {
        res.status(404).json({ error: 'Task ID nicht gefunden' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Ungültige ID' });

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex >= 0) {
        tasks.splice(taskIndex, 1);
        res.send("Task gelöscht");
    } else {
        res.status(404).json({ error: 'Task ID nicht gefunden' });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Benutzername und Passwort sind erforderlich' });
    }
    if (username === email && password === pw) {
        isLoggedIn = true;
        const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
        res.cookie('auth_token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login erfolgreich', token });
    } else {
        res.status(401).send('Unauthorized: Ungültige Zugangsdaten');
    }
});

app.get('/verify', verifyToken, (req, res) => {
    const user = req.user;
    console.log(user);
    res.status(200).json({ message: 'Cookie gültig', user });
});

app.delete('/logout', verifyToken, (req, res) => {
    res.clearCookie('auth_token');
    isLoggedIn = false;
    res.json({ message: 'Logout erfolgreich' });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
