import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Product } from '../../model/product';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.scss']
})
export class ExplorarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,
              private productService: ProductService,
              ) { }
  usuario: string;
  logged: boolean;
  productList: Product[];

  ngOnInit() {
    /**let test = new Product();
    test.$key = null;
    test.category = 'Ropa';
    test.descripcion = 'Jersey local de tigres, preparate para sobresalir con amigos con representando al más campeón de Nuevo León';
    test.name = 'Jersey Tigres 2020';
    test.price = 1099;
    test.urlImg = 'https://assets.adidas.com/images/w_600,f_auto,q_auto/0a186bbf68b84cdb9c84abf700dc5fe3_9366/Jersey_Local_Tigres_UANL_20-21_Amarillo_FR2301_01_laydown.jpg';
    test.availability = 35;
    this.productService.insertProduct(test);**/

    return this.productService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.productList.push(x as Product);
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
}
