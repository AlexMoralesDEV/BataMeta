const { Sequelize } = require('sequelize');

const conne = new Sequelize('batameta', 'root', '.anchorCabecalhoHTML5!', {
    host: 'localhost',
    dialect: 'mysql'
})

conne.authenticate()
.then(() => {
    console.log('Conectado com sucesso!');
})
.catch((err) => {
    console.log(err);
})

module.exports = conne;
