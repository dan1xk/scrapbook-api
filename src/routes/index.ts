import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Usuario from '../classes/Usuario';
import Recado from '../classes/Recado';

import { 
    verificacaoDeCadastro,
    verificarLogin,
    verificarRecado,
    autenticarLogin
} from '../middlewares/middlewares';

const app = express();
const port = process.env.PORT || 8080;
export const usuarios: Usuario[] = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (request: Request, response: Response) => {
    return response.send('OK');
});

//mostrar usuarios
app.get('/cadastrar', (request: Request, response: Response, next: NextFunction) => {
    return response.json(usuarios);
});

//cadastrar usuario
app.post('/cadastrar', verificacaoDeCadastro, (request: Request, response: Response) => {
    const { nome , senha } = request.body;
    const usuario = new Usuario(nome, senha);
    usuarios.push(usuario)
    
    return response.status(201).json({
        mensagem: 'Conta criada com sucesso.'
    });
});

//logar
app.post('/login', autenticarLogin, (request: Request, response: Response) => {
    return response.status(200).json({
        mensagem: 'Logado com sucesso.'
    });  
});

app.post('/recados', verificarLogin, (request: Request, response: Response) => {
    return response.status(200).json({
        mensagem: 'Usuario Logado'
    });
});

//add Recado
app.post('/recados/:usuarioId',verificarRecado, (request: Request, response: Response) => {
    const { usuarioId } = request.params;
    const { recado } = request.body;
    const addRecado = new Recado(recado);
    const usuario = usuarios.findIndex(id => id.id === parseInt(usuarioId));
    usuarios[usuario].recado.push(addRecado)

    return response.status(201).json({
        mensagem: 'Recado Criado.'
    });
});

//deletar recados
app.delete('/:nome/recados/:recadoId', (request: Request, response: Response) => {
    const { nome, recadoId } = request.params;
    const usuario = usuarios.findIndex(usuario => usuario.nome === nome);
    const recado = usuarios[usuario].recado.findIndex(recado => recado.id === parseInt(recadoId));

    return usuarios[usuario].recado.splice(recado, 1),
    response.status(200).json({
        mensagem: 'Recado apagado'
    });
});

//editar recados
app.put('/:nome/recados/:recadoId', (request: Request, response: Response) => {
    const { recadoId, nome } = request.params;
    const { recado } = request.body;
    const usuario = usuarios.findIndex(usuario => usuario.nome === nome);
    const recadoUsuario = usuarios[usuario].recado.findIndex(recado => recado.id === parseInt(recadoId));

    return usuarios[usuario].recado[recadoUsuario].recados = recado,
    response.json({
        mensagem: 'Recado Editado.'
    });
});

app.listen(port, () => {
    console.log('Api ligada');
});
