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
              private anuncioService: AnuncioService
              ) { }
  usuario: string;
  logged: boolean;
  anunciosList: Anuncio[];
  productosList: Product[];
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

    this.afAuth.authState.subscribe( data => {
      if (data != null){
        this.logged = true;
        this.usuario = data.email;
      }else{
        this.logged = false;
      }
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
