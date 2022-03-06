import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Usuario from './classes/Usuario';
import Recado from './classes/Recado';

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
    return response.json(usuarios);
});

function verificacaoDeCadastro(request: Request, response: Response, next: NextFunction) {
    const { nome , senha } = request.body;
    const usuario = new Usuario(nome, senha);
    const usuarioNome = usuarios.find(usuario => usuario.nome === nome);
    let validate = true;

    if(usuarioNome) {
        return validate = false,
        response.status(401).json({
            mensagem: 'Nome já cadastrado.'
        });
    }

    if(!nome || !senha) {
        return validate = false,
        response.status(400).json({
            mensagem: 'Preencha todos os campos.'
        });
    };

    if(usuario.senha.length <= 3) {
        return validate = false,
        response.status(400).json({
            mensagem: 'Sua senha precisa ter mais de 3 caracteres.'
        });
    };

    if(usuario.nome.length < 3) {
        return validate = false,
        response.status(400).json({
            mensagem: 'Nome de usuario precisa ser maior que 2 caracteres.'
        });
    };

    if(validate == true) {
        return usuarios.push(usuario),
        next();
    };
};

//cadastrar usuario
app.post('/cadastrar', verificacaoDeCadastro, (request: Request, response: Response) => {
    return response.status(201).json({
        mensagem: 'Conta criada com sucesso.'
    });
});

//logar
app.get('/login', autenticarLogin, (request: Request, response: Response) => {
    return response.status(200).json({
        mensagem: 'Logado com sucesso.'
    });  
});

function autenticarLogin(request: Request, response: Response, next: NextFunction) {
    const { nome , senha } = request.body;
    const usuarioNome = usuarios.find(usuario => usuario.nome === nome);
    const usuarioSenha = usuarios.find(usuario => usuario.senha === senha);
    let validate = true;

    if (!usuarioNome || !usuarioSenha) {
        return validate = false,
        response.json({
            mensagem: 'Preencha os campos corretamente.'
        });
    };

    if(validate == true) {
        return next();
    };
};

//add Recado
app.post('/recados/:usuarioId',verificarRecado, (request: Request, response: Response) => {
    return response.status(201).json({
        mensagem: 'Recado Criado.'
    });
});

function verificarRecado(request: Request, response: Response, next: NextFunction) {
    const { usuarioId } = request.params;
    const { recado } = request.body;
    const addRecado = new Recado(recado);
    const usuario = usuarios.findIndex(id => id.id === parseInt(usuarioId));
    let validate = true;

    if(!recado) {
        return validate = false,
        response.json({
            mensagem: 'Preecha o recado'
        });   
    };

    if(validate == true) { 
    return usuarios[usuario].recado.push(addRecado),
    next();
    };
};

//deletar recados
app.delete('/recados/:usuarioId/:recadoId', (request: Request, response: Response) => {
    const { usuarioId, recadoId } = request.params;
    const usuario = usuarios.findIndex(id => id.id === parseInt(usuarioId));
    const recado = usuarios[usuario].recado.findIndex(recado => recado.id === parseInt(recadoId));

    return usuarios[usuario].recado.splice(recado, 1),
    response.status(200).json({
        mensagem: 'Recado apagado'
    });
});

//editar recados
app.put('/recados/:nome/:recadoId', (request: Request, response: Response) => {
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
