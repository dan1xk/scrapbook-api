export default class Errand {
    id: number;

    constructor(public errand: string) {
        this.id = Math.floor(Math.random() * 1000);
    };
};