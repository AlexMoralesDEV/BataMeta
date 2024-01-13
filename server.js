require('dotenv').config();

const express = require('express');
const path = require('node:path');
const app = express();
const route = require('./routes');
const conne = require('./src/db/conne');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const flash = require('connect-flash');
const { LoginModel } = require('./src/models/LoginModel');
const { middleware } = require('./src/middlewares/middleware');

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'src', 'views'));

const sessionConfig = session({
    secret: 'jayjsakldjashdjkas',
    store: MongoStore.create({ mongoUrl: process.env.SESSIONMONGO }),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }
});

app.use(sessionConfig);
app.use(flash());
app.use(middleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(route);

// conne.sync({ force: true })
conne.sync()
.then(() => {
    app.emit('Pronto');
})
.catch((err) => {
    console.log(err);
});

app.on('Pronto', () => {
    app.listen(3000, () => {
        console.log('O servidor está rodando!');
        console.log('http://localhost:3000');
    })
});