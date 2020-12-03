import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
  categoriaList: AngularFireList<any>;
  selectedCategoria: Categoria = new Categoria();

  constructor(private firebase: AngularFireDatabase) {
    this.categoriaList = this.firebase.list('categoria');
  }

  getCategorias()
  {
    return this.categoriaList = this.firebase.list('categoria');
  }

  insertCategoria(categoria: Categoria)
  {
    this.categoriaList.push({
      nombre: categoria.nombre,
      urlImg: categoria.urlImg,
      filtro: categoria.filtro
    });
  }

  deleteCategoria($key: string)
  {
    this.categoriaList.remove($key);
  }
}
