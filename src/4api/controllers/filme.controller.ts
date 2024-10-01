import { Router, Request, Response, NextFunction } from 'express';
import { AtualizarFilmeDTO, CriarFilmeDTO } from '../../2dominio/dtos/filme.dto';
import { body, param, validationResult } from 'express-validator';
import { inject, injectable } from 'inversify';
import FilmeServiceInterface from '../../2dominio/interfaces/servicos/filme-servico.interface';
import asyncHandler from '../utils/async-handler';

@injectable()
class FilmeController {
  private readonly filmeService: FilmeServiceInterface;
  public readonly router: Router = Router();

  constructor(@inject('FilmeService') filmeRepositorio: FilmeServiceInterface,
  ) {
    this.filmeService = filmeRepositorio;
    this.routes();
  }

  routes() {
    this.router.get('/', asyncHandler(this.buscarTodos.bind(this)));
    
    this.router.get('/:id',
      [
        param('id').isNumeric().withMessage('O id tem que ser um numero')
      ]
      , asyncHandler(this.buscarPorId.bind(this)));
    this.router.post('/',
      [
        body('titulo')
          .exists().withMessage('O campo titulo é obrigatório')
          .isString().withMessage('O campo titulo tem que ser uma string'),
        body('estreia')
          .exists().withMessage('O campo estreia é obrigatório')
          .isBoolean().withMessage('O campo estreia tem que ser um boolean')
      ],
      this.criar.bind(this));

    this.router.patch('/:id', 
      [
        body('id')
          .exists().withMessage('O campo id é obrigatório')
          .isString().withMessage('O campo id tem que ser um número')
      ], asyncHandler(this.atualizar.bind(this)));
    
    this.router.delete('/:id', asyncHandler(this.deletar.bind(this)));
  }

  async buscarTodos(req: Request, res: Response): Promise<void> {
    const filmes = await this.filmeService.buscarTodos();
    res.json(filmes);
  }

  async buscarPorId(req: Request, res: Response) {
    const errosValidacao = await validationResult(req);

    if (!errosValidacao.isEmpty()) {
      return res.status(400).json({ erros: errosValidacao.array() });
    }

    const id = req.params.id ?? 1;
    const filme = await this.filmeService.buscarPorId(+id);
    res.json(filme);
  }

  async criar(req: Request, res: Response) {
    const errosValidacao = await validationResult(req);

    if (!errosValidacao.isEmpty()) {
      return res.status(400).json({ erros: errosValidacao.array() });
    }

    const dadosFilme: CriarFilmeDTO = req.body;
    this.filmeService.criar(dadosFilme);
    const filmes = await this.filmeService.buscarTodos();
    res.status(201).json(filmes);
  }

  async atualizar(req: Request, res: Response) {
    const id = req.params.id;
    const dadosNovos: AtualizarFilmeDTO = req.body;

    await this.filmeService.atualizar(+id, dadosNovos);
    res.json('Filme atualizado com sucesso!');
  }

  async deletar(req: Request, res: Response) {
    const id = req.params.id;
    await this.filmeService.deletar(+id);
    res.json('Filme deletado com sucesso!');
  }
}

export default FilmeController;