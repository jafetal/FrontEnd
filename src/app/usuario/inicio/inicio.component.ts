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

  anunciosList: Anuncio[];
  productosList: Product[];
  categoriaList: Categoria[];
  anuncioActivo: Anuncio = new Anuncio();

  ngOnInit() {
    /**let test = new Anuncio();
    test.$key = null;
    test.name = '¡Nuevo Servicio!';
    test.information = 'La nueva modalidad de nuestra tienda en línea estará pronto disponible, las comidas que ya conoces ahora a domicilio, usando tu cuenta de siempre podrás ordenar de nuestro extenso menú';
    test.title = '¡No te quedes con hambre!';
    test.banner = false;
    test.urlImg = 'https://www.saborusa.com/wp-content/uploads/2019/10/Animate-a-disfrutar-una-deliciosa-pizza-de-salchicha-Foto-destacada.png';
    test.fecha = new Date();
    this.anuncioService.insertAnuncio(test);**/
    /**let test = new Anuncio();
    test.$key = null;
    test.name = 'Nueva colección de invierno 2020';
    test.information = 'Ya está aquí la muy esperada colección de invierno 2020, busca algo que se ajuste a tu estilo, o prueba uno nuevo con nuestros productos, buscalo en nuestra sección de ropa';
    test.title = 'Colección de invierno 2020';
    test.banner = true;
    test.urlImg = 'https://www.mejorescinco.com/wp-content/uploads/2020/01/ropa-invierno-mujer_2000x578_01.jpg';
    test.fecha = new Date();
    this.anuncioService.insertAnuncio(test);**/

    /**let test = new Categoria();
    test.$key = null;
    test.nombre = 'Abarrotes';
    test.urlImg = 'https://firebasestorage.googleapis.com/v0/b/frontend-9ced7.appspot.com/o/categorias%2Fabarrotes.png?alt=media&token=e3e2db19-b123-45aa-bd0c-adcb053ee5c0';
    test.filtro = '1';
    this.categoriaService.insertCategoria(test);**/

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

  setActive(anuncio: Anuncio){
    this.anuncioActivo = anuncio;
  }
}
