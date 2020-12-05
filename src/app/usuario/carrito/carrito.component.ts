import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  public productosList: Product[] = [];
  total = 0;
  constructor() { }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('carrito')) == null){
      localStorage.setItem('carrito', JSON.stringify(this.productosList));
    }
    this.productosList = JSON.parse(localStorage.getItem('carrito'));
    this.productosList.forEach( p => {
      this.total += p.price * p.cantidadSeleccionada;
    });
  }

  quitar(i: number){
    this.productosList.splice(i,1);
    localStorage.setItem('carrito', JSON.stringify(this.productosList));
    this.productosList = JSON.parse(localStorage.getItem('carrito'));
  }

}
