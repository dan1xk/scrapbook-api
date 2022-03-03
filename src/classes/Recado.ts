export default class Recado {
    id: number;

    constructor(public recados: string) {
        this.id = Math.floor(Math.random() * 1000);
    };
};