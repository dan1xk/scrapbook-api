export default class Recado {
    id: number

    constructor(public recado: string) {
        this.id = Math.floor(Math.random() * 1000);
    }
}