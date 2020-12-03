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

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [3, 6, 9];

  ngOnInit() {
    /**let test = new Product();
    test.$key = null;
    test.category = 'Electrónicos';
    test.location = 'Indiferente';
    test.name = 'Alga Marina';
    test.price = 100;
    test.urlImg = 'https://i.pinimg.com/originals/dc/84/ee/dc84ee4334c48a24b4e2833813605100.png';
    test.availability = 100;
    this.productService.insertProduct(test);**/

    this.afAuth.authState.subscribe( data => {
      if (data != null){
        this.logged = true;
        this.usuario = data.email;
      }else{
        this.logged = false;
      }
    });

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

  getRequestParams(searchTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  handlePageChange(event): void {
    this.page = event;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    }
}
