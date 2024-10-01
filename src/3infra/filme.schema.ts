import { ObjectId } from "mongodb";

export type FilmeSchema = {
    id: number,
    titulo: string,
    estreia: boolean,
    _id?: ObjectId,
    data?: string,
    elenco?: string[],
    equipe?: object[],
    poster?: string
}
