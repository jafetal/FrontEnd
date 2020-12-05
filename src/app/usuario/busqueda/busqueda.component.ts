import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  productList: Product[] = [];
  filtro: string;
  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.filtro = params['busqueda'];
      this.productService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          let y = x as Product;
          if( y.name.toLowerCase().includes(this.filtro.toLowerCase()) ){
            this.productList.push(x as Product);
          }
        });

      });
    });
  }

}
