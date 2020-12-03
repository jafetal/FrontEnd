import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  productList: AngularFireList<any>;
  selectedProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase) {
    this.productList = this.firebase.list('products');
  }

  getProducts()
  {
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Product)
  {
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price,
      urlImg: product.urlImg,
      availability: product.availability
    });
  }

  updateProduct(product: Product)
  {
    this.productList.update(product.$key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  deleteProduct($key: string)
  {
    this.productList.remove($key);
  }
}