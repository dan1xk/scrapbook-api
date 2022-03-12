"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarios = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Usuario_1 = __importDefault(require("../classes/Usuario"));
const Recado_1 = __importDefault(require("../classes/Recado"));
const middlewares_1 = require("../middlewares/middlewares");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
exports.usuarios = [];
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.get('/', (request, response) => {
    return response.send('OK');
});
//mostrar usuarios
app.get('/cadastrar', (request, response, next) => {
    return response.json(exports.usuarios);
});
//cadastrar usuario
app.post('/cadastrar', middlewares_1.verificacaoDeCadastro, (request, response) => {
    const { nome, senha } = request.body;
    const usuario = new Usuario_1.default(nome, senha);
    exports.usuarios.push(usuario);
    return response.status(201).json({
        mensagem: 'Conta criada com sucesso.'
    });
});
//logar
app.post('/login', middlewares_1.autenticarLogin, (request, response) => {
    return response.status(200).json({
        mensagem: 'Logado com sucesso.'
    });
});
app.post('/recados', middlewares_1.verificarLogin, (request, response) => {
    return response.status(200).json({
        mensagem: 'Usuario Logado'
    });
});
//add Recado
app.post('/recados/:usuarioId', middlewares_1.verificarRecado, (request, response) => {
    const { usuarioId } = request.params;
    const { recado } = request.body;
    const addRecado = new Recado_1.default(recado);
    const usuario = exports.usuarios.findIndex(id => id.id === parseInt(usuarioId));
    exports.usuarios[usuario].recado.push(addRecado);
    return response.status(201).json({
        mensagem: 'Recado Criado.'
    });
});
//deletar recados
app.delete('/:nome/recados/:recadoId', (request, response) => {
    const { nome, recadoId } = request.params;
    const usuario = exports.usuarios.findIndex(usuario => usuario.nome === nome);
    const recado = exports.usuarios[usuario].recado.findIndex(recado => recado.id === parseInt(recadoId));
    return exports.usuarios[usuario].recado.splice(recado, 1),
        response.status(200).json({
            mensagem: 'Recado apagado'
        });
});
//editar recados
app.put('/:nome/recados/:recadoId', (request, response) => {
    const { recadoId, nome } = request.params;
    const { recado } = request.body;
    const usuario = exports.usuarios.findIndex(usuario => usuario.nome === nome);
    const recadoUsuario = exports.usuarios[usuario].recado.findIndex(recado => recado.id === parseInt(recadoId));
    return exports.usuarios[usuario].recado[recadoUsuario].recados = recado,
        response.json({
            mensagem: 'Recado Editado.'
        });
});
app.listen(port, () => {
    console.log('Api ligada');
});
