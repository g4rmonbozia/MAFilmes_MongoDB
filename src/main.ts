import express, {  NextFunction, Request, Response } from 'express';
import routes from './4api/routes';
import Logger from './3infra/middlewares/logger.middleware';
import ErrorHandler from './3infra/middlewares/error-handler.middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerConfig from './3infra/swagger.options';
import swaggerUi from 'swagger-ui-express';
import AuthService from './2dominio/servicos/auth.service';
import NotFoundException from './2dominio/exceptions/not-found.exception';
import rotaNaoEncontradaMiddleware from './3infra/middlewares/rota-nao-encontrada.middleware';

const app = express();
const port = 3000;
const swaggerOptions = swaggerJSDoc(swaggerConfig);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use(express.json());
app.use(Logger.init());
app.use(AuthService.protect());
app.use('/api', routes);
app.use(rotaNaoEncontradaMiddleware);
app.use(ErrorHandler.init());

app.get('/', (req: Request, res: Response) => {
  res.json('Bem vindo. Esta é a sua primeira API');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: http://localhost:${port}`);
});