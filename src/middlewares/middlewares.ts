import express, { Request, Response, NextFunction } from 'express';
import User from '../classes/User';
import { users } from '../index';

export function checkRegistration(request: Request, response: Response, next: NextFunction) {
    const { name , password } = request.body;
    const user = new User(name, password);
    const userName = users.find(user => user.name === name);
    let validate = true;

    if (userName) {
        return validate = false,
        response.status(401).json({
            message: 'Usuario já cadastrado.'
        });
    }

    if (!name || !password) {
        return validate = false,
        response.status(400).json({
            message: 'Preencha todos os campos.'
        });
    };

    if (user.password.length <= 3) {
        return validate = false,
        response.status(400).json({
            message: 'Sua senha precisa ter mais de 3 caracteres.'
        });
    };

    if (user.name.length < 3) {
        return validate = false,
        response.status(400).json({
            message: 'Seu nome precisa ter mais de 2 caracteres.'
        });
    };

    if (validate == true) {
        return next()
    };
};

export function checkLogin(request: Request, response: Response, next: NextFunction) {
    const { name } = request.body;
    const userName = users.find(user => user.name === name);
    let validate = true;

    if (name !== userName?.name) {
        return validate = false,
        response.status(401).json({
            message: 'Usuario Não Logado'
        });
    };

    if (validate = true) {
        next()
    };
};

export function checkErrand(request: Request, response: Response, next: NextFunction) {
    const { errand } = request.body;
    let validate = true;

    if (!errand) {
        return validate = false,
        response.status(400).json({
            message: 'Preecha o recado'
        });   
    };

    if (validate == true) { 
    return next()
    };
};

export function authenticateUser(request: Request, response: Response, next: NextFunction) {
    const { name , password } = request.body;
    const userName = users.find(user => user.name === name);
    const userPassword = users.find(user => user.password === password);
    let validate = true;

    if (!name || !password) {
        return validate = false,
        response.status(400).json({
            message: 'Preencha todos os campos.'
        });
    };

    if (name != userName?.name || password != userPassword?.password) {
        return validate = false,
        response.status(401).json({
            message: 'Senha ou nome incorreto.'
        });
    };

    if (validate == true) {
        return next()
    };
};