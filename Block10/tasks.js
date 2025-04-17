const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

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
]

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

app.post('/tasks', (req, res) => {
    const {title, description} = req.body;
    const newTask = { title, description };
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    res.status(201).send(newTask);
})

app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const foundTask = tasks.find((task) => task.id === id)
    if (foundTask) {
        res.send(foundTask)
    } else {
        res.status(404).json({ error: 'Task ID not found' })
    }
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const taskIndex = tasks.findIndex((task) => task.id === id)
    const newTask = req.body
    newTask.id = id

    if (taskIndex >= 0) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...newTask }
        res.send(tasks[taskIndex])
    } else {
        res.status(404).json({ error: 'Task ID not found' })
    }
})

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const taskIndex = tasks.findIndex((task) => task.id === id)
    if (taskIndex >= 0) {
        tasks.splice(taskIndex, 1);
        res.send("Book deleted");
    } else {
        res.status(404).json({ error: 'Task ID not found' })
    }
});


app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
