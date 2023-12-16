require('dotenv').config();

const express = require('express');
const path = require('node:path');
const app = express();
const route = require('./routes')
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTSTRING)
.then(resposta => {
    console.log('Está conectado ao banco de dados!');
    app.emit('Pronto')
})
.catch(err => {
    console.log(err);
})

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'src', 'views'));

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(route);

app.on('Pronto', () => {
    app.listen(3000, () => {
        console.log('O servidor está rodando!');
        console.log('http://localhost:3000');
    })
});