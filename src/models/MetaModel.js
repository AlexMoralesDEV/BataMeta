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

    async atualizarMeta(id, valorAtual){
        this.validar();
        
        if(this.errors.length > 0) return;

        this.meta = MetaModel.update({valorAtual: valorAtual}, { where: { id: id}});
        return this.meta;
    }

    validar(){
        for(let i in this.body){
            if(this.body[i] == '') this.errors.push('O campo não pode estar vazio!');
        }
    }
}

module.exports = { MetaModel, Meta };