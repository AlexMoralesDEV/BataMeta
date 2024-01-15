const { DataTypes } = require('sequelize');
const conne = require('../db/conne');
const { LoginModel } = require('./LoginModel');

const MetaModel = conne.define('Meta', {
    nome: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    valorMeta: {
        type: DataTypes.FLOAT,
        required: true,
        allowNull: false
    },
    prazoMeta: {
        type: DataTypes.DATE,
        required: true,
        allowNull: false 
    },
    valorAtual: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});

MetaModel.belongsTo(LoginModel);
LoginModel.hasMany(MetaModel);

class Meta{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.meta = null;
    }

    async cadastrar(){
        this.meta = await MetaModel.create(this.body);
        return this.meta;
    }
}

module.exports = { MetaModel, Meta };