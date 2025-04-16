const {response} = require("express");
const app = express();
const port = 3001;
const path = require('path');
const express = require("express");


const lends = []



app.get('/books', (request, response) => {
    const books = [
        { isbn: "8789", title: "Der Prozess", year: "1919", author: "Franz Kafka" },

    ];
    response.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.json(book);
})

app.post('/books', (req, res) => {

    const {title, author, year} = req.body;

    if (!title || !author) {
        return res.status(400).json({error: "Missing required fields author or title"});
    }

    if (typeof req.body !== 'object') {
        return res.status(400).json('Invalid data type');
    }

    if (title === undefined || author === undefined) {
        return res.status(400).send('Missing required fields author or title');
    }

    if (title==="" || author==="") {
        return res.status(400).send('Missing required fields');
    }

    if (typeof title !== 'string' || typeof author !== 'string') {
        return res.status(400).json({error:'Invalid data types'});
    }
    if (year && typeof year !== 'number' && year.length !== 4) {
        return res.status(400).json({error:'Invalid data type for year'});
    }



    const id = books.length - 1;
    const book = {id, title, author, year};
    books.push(book);
    res.status(201).json(book);


})

app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
    if (bookIndex === -1) {
        return res.status(404).send('Book not found');
    }
    books.splice(bookIndex, 1);
    res.send('Book deleted');
})

app.put('/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found');
    }
    const {title, author, year} = req.body;
    book.title = title;
    book.author = author;
    book.year = year;
    res.json(book);

});

app.patch('/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found');
    }
    const {title, author, year} = req.body;
    if (title) {
        book.title = title;
    }
    if (author) {
        book.author = author;
    }
    if (year) {
        book.year = year;
    }
    res.json(book);
});

app.get('/lends', (req, res) => {
    const { id, customer_id, isbn, borrowed_at, returned_at } = req.query;
    let lends = lends;
    res.json(lends);
});

app.get('/lends/:id', (req, res) => {
    const lend = lends.find(lend => lend.id === parseInt(req.params.id));
    res.json(lend);
})

app.post( '/lends', (req, res ) => {


});