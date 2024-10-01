import { Container } from "inversify";
import FilmeRepositorio from "./repositorios/filme.repositorio";
import FilmeController from "../4api/controllers/filme.controller";
import "reflect-metadata";
import FilmeRepositorioInterface from "../2dominio/interfaces/repositorios/filme-repositorio.interface";
import FilmeService from "../2dominio/servicos/filme.service";
import FilmeServiceInterface from "../2dominio/interfaces/servicos/filme-servico.interface";

var container = new Container();
container
  .bind<FilmeRepositorioInterface>('FilmeRepositorio')
  .to(FilmeRepositorio).inRequestScope();
container
  .bind<FilmeServiceInterface>('FilmeService')
  .to(FilmeService).inRequestScope();
container
  .bind<FilmeController>('FilmeController')
  .to(FilmeController).inRequestScope();

export default container;