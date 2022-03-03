import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Usuario from './classes/Usuario'

const app = express();
const port = process.env.PORT || 8080;
const usuarios: Usuario[] = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (request: Request, response: Response) => {
    return response.send('OK');
});
//mostrar usuarios
app.get('/cadastrar', (request: Request, response: Response, next: NextFunction) => {
    return response.json(usuarios)
});

//cadastrar usuario
app.post('/cadastrar/:nome/:senha', verificacaoDeCadastro, (request: Request, response: Response, next: NextFunction) => {
    return response.status(201).json({
        mensagem: 'Conta criada com sucesso.'
    });
});

function verificacaoDeCadastro(request: Request, response: Response, next: NextFunction) {
    const { nome , senha } = request.params;
    const usuario = new Usuario(nome, senha);
    let validate = true;

    if(!nome || !senha) {
        return validate = false,
        response.json({
            mensagem: 'Preencha todos os campos.'
        });
    };

    if(usuario.senha.length <= 3) {
        return validate = false,
        response.json({
            mensagem: 'Sua senha precisa ter mais de 3 caracteres.'
        });
    };

    if(validate == true) {
        return usuarios.push(usuario),
        next();
    }

}


app.listen(port, () => {
    console.log('Api ligada');
});