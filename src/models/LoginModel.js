const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    usuario: String,
    senha: String
});

const LoginModel = mongoose.model('Login', LoginSchema);

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

    async registrar(){
        this.valida();

        if(this.errors.length > 0) return;

        this.user = await LoginModel.create(this.body);
    }

    verificarTipoDosDados() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }

        this.body = {
            usuario: this.body.usuario,
            senha: this.body.senha
        }
    }
}

module.exports = Login;