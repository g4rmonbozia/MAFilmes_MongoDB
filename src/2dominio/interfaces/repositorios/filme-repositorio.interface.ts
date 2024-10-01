import { FilmeModel } from "../../../1entidades/filmes.entity";
import { AtualizarFilmeDTO, CriarFilmeDTO } from "../../dtos/filme.dto";

interface FilmeRepositorioInterface {

  buscarTodos (): Promise<(FilmeModel | undefined)[]>;

  buscaPorId (id: number): Promise<FilmeModel | undefined>;

  criar (usario: CriarFilmeDTO): Promise<void>;

  atualizar (id:number, dadosNovos: AtualizarFilmeDTO): Promise<void>;

  deletar (id: number): Promise<void>;
}

export default FilmeRepositorioInterface;