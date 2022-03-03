import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request: Request, response: Response) => {
    return response.send('OK');
});

app.listen(port, () => {
    console.log('Api ligada');
});