import { Anuncio } from './../model/anuncio';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class AnuncioService {
  anuncionsList: AngularFireList<any>;
  selectedAnuncio: Anuncio = new Anuncio();

  constructor(private firebase: AngularFireDatabase) {
    this.anuncionsList = this.firebase.list('anuncios');
  }

  getAnuncios()
  {
    return this.anuncionsList = this.firebase.list('anuncios');
  }

  insertAnuncio(anuncio: Anuncio)
  {
    this.anuncionsList.push({
      name: anuncio.name,
      urlImg: anuncio.urlImg,
      information: anuncio.information,
      title: anuncio.title,
      banner: anuncio.banner,
      fecha: anuncio.fecha
    });
  }

  updateAnuncios(anuncio: Anuncio)
  {
    this.anuncionsList.update(anuncio.$key, {
      name: anuncio.name,
      urlImg: anuncio.urlImg,
      information: anuncio.information,
      title: anuncio.title,
      banner: anuncio
    });
  }

  deleteAnuncio($key: string)
  {
    this.anuncionsList.remove($key);
  }
}
