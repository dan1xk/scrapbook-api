import express, { Request, Response, NextFunction } from 'express';
import Usuario from '../classes/Usuario';
import { usuarios } from '../routes';

export function verificacaoDeCadastro(request: Request, response: Response, next: NextFunction) {
    const { nome , senha } = request.body;
    const usuario = new Usuario(nome, senha);
    const usuarioNome = usuarios.find(usuario => usuario.nome === nome);
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
    };

    if (usuario.senha.length <= 3) {
        return validate = false,
        response.status(400).json({
            mensagem: 'Sua senha precisa ter mais de 3 caracteres.'
        });
    };

    if (usuario.nome.length < 3) {
        return validate = false,
        response.status(400).json({
            mensagem: 'Seu nome precisa ter mais de 2 caracteres.'
        });
    };

    if (validate == true) {
        return next()
    };
};

export function verificarLogin(request: Request, response: Response, next: NextFunction) {
    const { nome } = request.body;
    const usuarioNome = usuarios.find(usuario => usuario.nome === nome);
    let validate = true;

    if (nome !== usuarioNome?.nome) {
        return validate = false,
        response.status(401).json({
            mensagem: 'Usuario Não Logado'
        });
    };

    if (validate = true) {
        next()
    };
};

export function verificarRecado(request: Request, response: Response, next: NextFunction) {
    const { recado } = request.body;
    let validate = true;

    if (!recado) {
        return validate = false,
        response.json({
            mensagem: 'Preecha o recado'
        });   
    };

    if (validate == true) { 
    return next()
    };
};

export function autenticarLogin(request: Request, response: Response, next: NextFunction) {
    const { nome , senha } = request.body;
    const usuarioNome = usuarios.find(usuario => usuario.nome === nome);
    const usuarioSenha = usuarios.find(usuario => usuario.senha === senha);
    let validate = true;

    if (!nome || !senha) {
        return validate = false,
        response.status(400).json({
            mensagem: 'Preencha todos os campos.'
        });
    };

    if (nome != usuarioNome?.nome || senha != usuarioSenha?.senha) {
        return validate = false,
        response.status(401).json({
            mensagem: 'Senha ou nome incorreto.'
        });
    };

    if (validate == true) {
        return next()
    };
};