import { Router } from 'express';
import FilmeController from './controllers/filme.controller';
import container from '../3infra/inversify.config';

const routes = Router();


const filmeController = container.get<FilmeController>('FilmeController');

routes.use('/filmes', filmeController.router);

export default routes;