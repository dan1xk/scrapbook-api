"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarLogin = exports.verificarRecado = exports.verificarLogin = exports.verificacaoDeCadastro = void 0;
const Usuario_1 = __importDefault(require("../classes/Usuario"));
const routes_1 = require("../routes");
function verificacaoDeCadastro(request, response, next) {
    const { nome, senha } = request.body;
    const usuario = new Usuario_1.default(nome, senha);
    const usuarioNome = routes_1.usuarios.find(usuario => usuario.nome === nome);
    let validate = true;
    if (usuarioNome) {
        return validate = false,
            response.status(401).json({
                mensagem: 'Usuario já cadastrado.'
            });
    }
    if (!nome || !senha) {
        return validate = false,
            response.status(400).json({
                mensagem: 'Preencha todos os campos.'
            });
    }
    ;
    if (usuario.senha.length <= 3) {
        return validate = false,
            response.status(400).json({
                mensagem: 'Sua senha precisa ter mais de 3 caracteres.'
            });
    }
    ;
    if (usuario.nome.length < 3) {
        return validate = false,
            response.status(400).json({
                mensagem: 'Seu nome precisa ter mais de 2 caracteres.'
            });
    }
    ;
    if (validate == true) {
        return next();
    }
    ;
}
exports.verificacaoDeCadastro = verificacaoDeCadastro;
;
function verificarLogin(request, response, next) {
    const { nome } = request.body;
    const usuarioNome = routes_1.usuarios.find(usuario => usuario.nome === nome);
    let validate = true;
    if (nome !== usuarioNome?.nome) {
        return validate = false,
            response.status(401).json({
                mensagem: 'Usuario Não Logado'
            });
    }
    ;
    if (validate = true) {
        next();
    }
    ;
}
exports.verificarLogin = verificarLogin;
;
function verificarRecado(request, response, next) {
    const { recado } = request.body;
    let validate = true;
    if (!recado) {
        return validate = false,
            response.json({
                mensagem: 'Preecha o recado'
            });
    }
    ;
    if (validate == true) {
        return next();
    }
    ;
}
exports.verificarRecado = verificarRecado;
;
function autenticarLogin(request, response, next) {
    const { nome, senha } = request.body;
    const usuarioNome = routes_1.usuarios.find(usuario => usuario.nome === nome);
    const usuarioSenha = routes_1.usuarios.find(usuario => usuario.senha === senha);
    let validate = true;
    if (!nome || !senha) {
        return validate = false,
            response.status(400).json({
                mensagem: 'Preencha todos os campos.'
            });
    }
    ;
    if (nome != usuarioNome?.nome || senha != usuarioSenha?.senha) {
        return validate = false,
            response.status(401).json({
                mensagem: 'Senha ou nome incorreto.'
            });
    }
    ;
    if (validate == true) {
        return next();
    }
    ;
}
exports.autenticarLogin = autenticarLogin;
;
