"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(nome, senha) {
        this.nome = nome;
        this.senha = senha;
        this.recado = [];
        this.id = Math.floor(Math.random() * 1000);
    }
    ;
}
exports.default = Usuario;
;
