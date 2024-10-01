/* eslint-disable no-unused-vars */
// DTO Data Tranfer object
import { FilmeModel } from '../../1entidades/filmes.entity';

export type CriarFilmeDTO = Omit<FilmeModel, 'id' >

export type AtualizarFilmeDTO = Partial<CriarFilmeDTO>


