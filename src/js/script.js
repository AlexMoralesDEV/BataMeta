class Usuario {
    constructor(usuario, senha) {
        this.usuario = usuario;
        this.senha = senha;
        this.metas = [];
    }

    static validarUsuario() {
        // Implementação da validação do usuário
    }

    static cadastrarUsuario(usuario, senha) {
        let novoUsuario = new Usuario(usuario, senha);
        usuarios.push(novoUsuario);
        return novoUsuario;
    }

    adicionarMeta(nome, valorMeta, dataMeta, valorAtual){
        let novaMeta = new Meta(nome, valorMeta, dataMeta, valorAtual);
        this.metas.push(novaMeta);
    }
}

class Meta{
    constructor(nome, valorMeta, dataPrazo, valorAtual = 0){
        this.nome = nome,
        this.valorMeta = valorMeta,
        this.dataPrazo = dataPrazo,
        this.valorAtual = valorAtual
    }

    depositarValor(valor){
        this.valorAtual += valor;
    }

    retirarValor(valor){
        this.valorAtual -= valor;
    }
}

let usuarios = []; 

Usuario.cadastrarUsuario('Cauã', '123');
usuarios[0].adicionarMeta('Reserva de Emergência', 5000, '05-10-2024')
usuarios[0].adicionarMeta('Viagem Final de Ano', 7460, '26-09-2025')
usuarios[0].metas[0].depositarValor(500);
console.log(usuarios[0].metas);