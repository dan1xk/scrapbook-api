import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Usuarios from './classes/Usuario'

const app = express();
const port = process.env.PORT || 8080;
const usuarios: Usuarios[] = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (request: Request, response: Response) => {
    return response.send('OK');
});

app.get('/cadastrar', (request: Request, response: Response, next: NextFunction) => {
    return response.json(usuarios)
});

app.listen(port, () => {
    console.log('Api ligada');
});