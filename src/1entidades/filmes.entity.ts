export class FilmeModel {
  _id?: string;
  id: number;
  titulo: string;
  estreia: boolean;

  constructor (
    id: number,
    titulo: string,
    estreia: boolean,
    _id?: string,
  ) {
    
    this.id = id;
    this.titulo = titulo;
    this.estreia = estreia;
    this._id = _id;
  }
}
