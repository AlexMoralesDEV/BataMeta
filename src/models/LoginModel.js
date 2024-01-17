const bcrypt = require('bcryptjs');
const { DataTypes } = require('sequelize');
const conne = require('../db/conne');

const LoginModel = conne.define('Login', {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
})

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    valida() {
        this.verificarTipoDosDados();

        if (this.body.usuario.length < 3 || this.body.usuario.length > 13) { this.errors.push('Quantidade de caracteres inválida!') };
        if (this.body.senha.length < 3 || this.body.senha.length > 50) { this.errors.push('Quantidade de caracteres inválida!') };
    }

    async registrar() {
        this.valida();
        this.gerarHash();

        const user = await this.usuarioExiste();
        if (user) this.errors.push('Usuário com esse nome já cadastrado!');

        if (this.errors.length > 0) return;

        this.user = await LoginModel.create(this.body);

        return this.user;
    }

    async usuarioExiste() {
        const user = await LoginModel.findOne({ where: { usuario: this.body.usuario }, plain: true });
        return user;
    }

    static async buscarMetasdoUserporId(id){
        const { MetaModel } = require('./MetaModel');
        const user = await LoginModel.findOne({ where: { id: id }, include: MetaModel});
        console.log(user);
        const userMetas = user.dataValues.Meta.map(( element ) => {
            return element.dataValues;
        })

        return userMetas;
    }

    async entrar() {
        try {
            this.valida();

            const { senha } = this.body;
            const user = await this.usuarioExiste();

            if (!user) this.errors.push('Usuário com esse nome não existe!');

            if (this.errors.length > 0) return;

            const compararSenha = bcrypt.compareSync(senha, user.senha);
            if (!compararSenha) this.errors.push('Usuário e/ou senha incorretos!');

            return user.id;
        }catch(err){
            console.log(err);
        }
    };

    verificarTipoDosDados() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }

        this.body = {
            usuario: this.body.usuario,
            senha: this.body.senha
        }
    }

    gerarHash() {
        const { usuario, senha } = this.body;

        const salt = bcrypt.genSaltSync(10);
        const senhaHash = bcrypt.hashSync(senha, salt);

        this.body = {
            usuario,
            senha: senhaHash
        }
    }
}

module.exports = { Login, LoginModel };