import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import User from './classes/User';
import Errand from './classes/Errand';

import { 
    checkRegistration,
    checkLogin,
    authenticateUser,
    checkErrand
} from './middlewares/middlewares';

const app = express();
const port = process.env.PORT || 8080;
export const users: User[] = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (request: Request, response: Response) => {
    return response.send('OK');
});

app.get('/users', (request: Request, response: Response, next: NextFunction) => {
    return response.status(200).json(users);
});

app.post('/register', checkRegistration, (request: Request, response: Response) => {
    const { name , password } = request.body;
    const user = new User(name, password);
    users.push(user)
    
    return response.status(201).json({
        message: 'Conta criada com sucesso.'
    });
});

app.post('/login', authenticateUser, (request: Request, response: Response) => {
    return response.status(200).json({
        message: 'Logado com sucesso.'
    });  
});

app.post('/errands', checkLogin, (request: Request, response: Response) => {
    return response.status(200).json({
        message: 'Usuario Logado'
    });
});

app.post('/errand/:name', checkErrand, (request: Request, response: Response) => {
    const { name } = request.params;
    const { errand } = request.body;
    const user = users.findIndex(user => user.name === name);
    const addErrand = new Errand(errand);

    users[user].errands.push(addErrand)

    return response.status(201).json({
        message: 'Recado Criado.'
    });
});

app.delete('/:name/errand/:errandId', (request: Request, response: Response) => {
    const { name, errandId } = request.params;
    const user = users.findIndex(user => user.name === name);
    const errand = users[user].errands.findIndex(errand => errand.id === parseInt(errandId));

    return users[user].errands.splice(errand, 1),
    response.status(200).json({
        message: 'Recado apagado'
    });
});

app.put('/:name/errand/:errandId', (request: Request, response: Response) => {
    const { name, errandId } = request.params;
    const { errand } = request.body;
    const user = users.findIndex(user => user.name === name);
    const errandUser = users[user].errands.findIndex(errand => errand.id === parseInt(errandId));

    return users[user].errands[errandUser].errand = errand,
    response.status(200).json({
        message: 'Recado Editado.'
    });
});

app.listen(port, () => {
    console.log('Api ligada');
});
