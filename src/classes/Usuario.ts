import Recado from './Recado';

export default class Usuario {
    id: number;
    recado: Recado[] = []

    constructor(public nome: string, public senha: string) {
        this.id = Math.floor(Math.random() * 1000);
    }
}