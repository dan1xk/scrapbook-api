import Errand from './Errand';

export default class Users {
    id: number;
    errands: Errand[] = [];

    constructor(public name: string, public password: string) {
        this.id = Math.floor(Math.random() * 1000);
    };
};
