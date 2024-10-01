import { FilmeSchema as FilmeSchema } from '../filme.schema';
import { AtualizarFilmeDTO, CriarFilmeDTO } from '../../2dominio/dtos/filme.dto';
import { FilmeModel } from '../../1entidades/filmes.entity';
import { injectable } from 'inversify';
import "reflect-metadata";
import dotenv from 'dotenv';
import FilmeRepositorioInterface from '../../2dominio/interfaces/repositorios/filme-repositorio.interface';
import { Collection, MongoClient, ObjectId, ServerApiVersion, WithId } from 'mongodb';

dotenv.config();

const CHAVEMONGO = process.env.MONGO_DB_KEY;

@injectable()
class FilmeRepositorio implements FilmeRepositorioInterface {
  private readonly CHAVEMONGO = process.env.MONGO_DB_KEY ?? '';
  private readonly dbName = 'dev';
  private readonly collectionName = 'filmes';


  private async getCollection(): Promise<{
    collection: Collection<FilmeSchema>,
    client: MongoClient
  }> {
    const client = new MongoClient(this.CHAVEMONGO,
      {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      }
    )
    await client.connect();
    const db = client.db(this.dbName);
    const collection = db.collection<FilmeSchema>(this.collectionName);
    return { collection, client }
  }

  public async buscarTodos(): Promise<(FilmeModel | undefined)[]> {
    const { collection, client } = await this.getCollection();
    try {
      const filmes = await collection.find({}).toArray();
      return filmes.map(filmeSchema => this.schemaParser(filmeSchema));
    } finally {
      await client.close();
    }
  }

  public async buscaPorId(id: number): Promise<FilmeModel | undefined> {
    const { collection, client } = await this.getCollection();
    try {
      const filmeSchema = await collection.findOne({ id: id });
      return this.schemaParser(filmeSchema);
    } finally {
      await client.close();
    }
  }

  public async criar(filme: CriarFilmeDTO): Promise<void> {
    const { collection, client } = await this.getCollection();
    try {
      const filmeMaiorId = await collection.find({}).sort({ id: -1 }).limit(1).toArray();

      const novoFilme: FilmeSchema = {
        id: filmeMaiorId[0].id + 1,
        titulo: filme.titulo,
        estreia: filme.estreia,
        _id: new ObjectId()
      }

      await collection.insertOne(novoFilme);

    } finally {
      await client.close();
    }
  }

  public async atualizar(id: number, dadosNovos: AtualizarFilmeDTO): Promise<void> {
    const { collection, client } = await this.getCollection();
    try {
      const atualizacao = {
        $set: {
          ...(dadosNovos.titulo && { titulo: dadosNovos.titulo }),
          ...(dadosNovos.estreia !== undefined && { estreia: dadosNovos.estreia }),
        }
      };

      await collection.updateOne({ id }, atualizacao)

    } finally {
      await client.close();
    }
  }

  public async deletar(id: number): Promise<void> {
    const { collection, client } = await this.getCollection();
    try {
      await collection.deleteOne({ id: id })
    } finally {
      await client.close();
    }
  }

  private schemaParser(filmeSchema: WithId<FilmeSchema> | null): FilmeModel | undefined {
    if (filmeSchema) {
      const filme = new FilmeModel(
        filmeSchema?.id ?? 0,
        filmeSchema?.titulo ?? "",
        filmeSchema?.estreia ?? false,
        filmeSchema?._id?.toString() ?? "");
      return filme;
    }
    return undefined;
  }
}

export default FilmeRepositorio;