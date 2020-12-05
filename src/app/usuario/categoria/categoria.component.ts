import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { ProductService } from './../../service/product.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categoria: string;
  usuario: string;
  productosList: Product[];
  logged: boolean;

  constructor(private route: ActivatedRoute,
              public afAuth: AngularFireAuth,
              private productService: ProductService) { }

  ngOnInit(){
    this.afAuth.authState.subscribe( data => {
      if (data != null){
        this.logged = true;
        this.usuario = data.email;
      }else{
        this.logged = false;
      }
    });

    this.route.params.subscribe(params => {
      this.categoria = params['nombre'];
      console.log(this.categoria);

      this.productService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.productosList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.productosList.push(x as Product);
        });
      });

    });
  }

}
