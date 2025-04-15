const {response} = require("express");
const app = express();
const port = 3001;
const path = require('path');
const express = require("express");

app.get('/books', (request, response) => {
    const books = [
        { isbn: "8789", title: "Der Prozess", year: "1919", author: "Franz Kafka" },

    ];
    response.json(books);
});