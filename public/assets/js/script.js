// class Usuario {
//     constructor(usuario, senha) {
//         this.usuario = usuario;
//         this.senha = senha;
//         this.metas = [];
//     }

//     static cadastrarUsuario(usuario, senha) {
//         if (Usuario.validarUsuarios()) {
//             let novoUsuario = new Usuario(usuario, senha);
//             usuarios.push(novoUsuario);
//             console.log(usuarios);
//             Usuario.limparDados();
//             return novoUsuario;
//         }
//     }

//     static validarUsuarios() {
//         let flag = true;
//         let inputs = document.querySelectorAll('.validar');
//         let erros = document.querySelectorAll('.texto-erro');

//         erros.forEach((elemento) => {
//             elemento.remove();
//         })

//         let criaErro = function (elemento, msg) {
//             let div = document.createElement('div');
//             div.innerHTML = msg;
//             div.setAttribute('class', 'texto-erro')
//             elemento.insertAdjacentElement('afterend', div);
//         };

//         inputs.forEach((elemento) => {
//             let elementoAnterior = elemento.previousElementSibling.innerText;
           
//             if (!elemento.value) {
//                 criaErro(elemento, `O campo ${elementoAnterior} não pode estar vazio!`)
//                 flag = false;
//             }

//             if(elemento.classList.contains('senha')){
//                 if(elemento.value.length < 6){
//                     criaErro(elemento, `A senha deve conter no mínimo 6 caracteres`);
//                     flag = false;
//                 }
//             }
//         })

//         return flag;
//     }

//     static limparDados(){
//         let inputs = document.querySelectorAll('.validar');

//         inputs.forEach((elemento) => {
//            elemento.value = '';
//         })
//     }

//     adicionarMeta(nome, valorMeta, dataMeta, valorAtual) {
//         let novaMeta = new Meta(nome, valorMeta, dataMeta, valorAtual);
//         this.metas.push(novaMeta);
//     }
// }

// class Meta {
//     constructor(nome, valorMeta, dataPrazo, valorAtual = 0) {
//         this.nome = nome,
//             this.valorMeta = valorMeta,
//             this.dataPrazo = dataPrazo,
//             this.valorAtual = valorAtual
//     }

//     depositarValor(valor) {
//         this.valorAtual += valor;
//     }

//     retirarValor(valor) {
//         this.valorAtual -= valor;
//     }
// }

// let usuarios = [];
// let nomeUsuario = document.querySelector('#usuario');
// let senhaUsuario = document.querySelector('#senha');
// let botaoEntrar = document.querySelector('#entrar');
// let botaoRegistrar = document.querySelector('#registrar');

// function cadastrarNovoUsuario() {
//     Usuario.cadastrarUsuario(nomeUsuario.value, senhaUsuario.value);
// }

// botaoRegistrar.addEventListener('click', cadastrarNovoUsuario);