import { FilmeModel } from "../../../1entidades/filmes.entity";
import { AtualizarFilmeDTO, CriarFilmeDTO } from "../../dtos/filme.dto";

interface FilmeServiceInterface {
    buscarPorId(id: number): Promise<FilmeModel | undefined>;
    buscarTodos (): Promise<(FilmeModel | undefined)[]>;
    criar (filme: CriarFilmeDTO): Promise<void> ;
    atualizar (id:number, filme: AtualizarFilmeDTO): Promise<void> ;
    deletar (id:number): Promise<void> ;
}

export default FilmeServiceInterface;