import { inject, injectable } from "inversify";
import { AtualizarFilmeDTO, CriarFilmeDTO } from "../dtos/filme.dto";
import NotFountException from "../exceptions/not-found.exception";
import FilmeRepositorioInterface from "../interfaces/repositorios/filme-repositorio.interface";
import FilmeServiceInterface from "../interfaces/servicos/filme-servico.interface";
import "reflect-metadata";
import { FilmeModel } from "../../1entidades/filmes.entity";

@injectable()
class FilmeService implements FilmeServiceInterface {
    private readonly filmeRepositorio: FilmeRepositorioInterface;
    constructor(@inject('FilmeRepositorio') filmeRepositorio: FilmeRepositorioInterface) {
        this.filmeRepositorio = filmeRepositorio;
    }

    async buscarPorId(id: number): Promise<FilmeModel | undefined> {
        const filme = await this.filmeRepositorio.buscaPorId(id);
        if (!filme) {
            throw new NotFountException('Filme não encontrado.');
        }
        return filme;
    }
    public async buscarTodos (): Promise<(FilmeModel | undefined)[]>{
        return await this.filmeRepositorio.buscarTodos();
    }
    public async criar (filme: CriarFilmeDTO): Promise<void> {
        await this.filmeRepositorio.criar(filme);
    }
    public async atualizar (id:number, filme: AtualizarFilmeDTO): Promise<void> {
        await this.filmeRepositorio.atualizar(id, filme);
    }
    public async deletar (id:number): Promise<void> {
        await this.filmeRepositorio.deletar(id);
    }
}

export default FilmeService;
