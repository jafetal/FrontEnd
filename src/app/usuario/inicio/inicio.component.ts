import { Router } from '@angular/router';
import { CategoriaService } from './../../service/categoria.service';
import { Categoria } from './../../model/categoria';
import { AnuncioService } from './../../service/anuncio.service';
import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Product } from '../../model/product';
import { Anuncio } from 'src/app/model/anuncio';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth,
              private productService: ProductService,
              private anuncioService: AnuncioService,
              private categoriaService: CategoriaService,
              private router: Router
              ) { }
  usuario: string;
  logged: boolean;
  anunciosList: Anuncio[];
  productosList: Product[];
  categoriaList: Categoria[];
  anuncioActivo: Anuncio = new Anuncio();

  ngOnInit() {
    /**let test = new Anuncio();
    test.$key = null;
    test.name = 'Manzana';
    test.information = 'Se acerca la temporada de manzanas, que mejor que tenerla lista para tragar';
    test.title = 'No te lo pierdas';
    test.banner = false;
    test.urlImg = 'https://www.eluniversal.com.mx/sites/default/files/2016/09/07/manzana.jpg';
    test.fecha = new Date();
    this.anuncioService.insertAnuncio(test);**/

    /**let test = new Categoria();
    test.$key = null;
    test.nombre = 'Abarrotes';
    test.urlImg = 'https://firebasestorage.googleapis.com/v0/b/frontend-9ced7.appspot.com/o/abarrotes.png?alt=media&token=99e7fed2-ff63-4d7d-ac0c-33eb0395db06';
    test.filtro = '1';
    this.categoriaService.insertCategoria(test);**/

    this.afAuth.authState.subscribe( data => {
      if (data != null){
        this.logged = true;
        this.usuario = data.email;
      }else{
        this.logged = false;
      }
    });

    this.categoriaService.getCategorias()
      .snapshotChanges().subscribe(item => {
        this.categoriaList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.categoriaList.push(x as Categoria);
        });
      });


    this.productService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.productosList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.productosList.push(x as Product);
        });
      });

    return this.anuncioService.getAnuncios()
      .snapshotChanges().subscribe(item => {
        this.anunciosList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.anunciosList.push(x as Anuncio);
        });
      });
  }

  signOut(){
    this.afAuth.authState.subscribe( data => {
      if (data != null){
        this.afAuth.signOut();
      }
    });
  }

  setActive(anuncio: Anuncio){
    this.anuncioActivo = anuncio;
  }
}
