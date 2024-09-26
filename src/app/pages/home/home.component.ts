import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CupcakeService } from '../../services/cup-cake.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private _router = inject(Router);
  // private _cupcakeService = inject(CupcakeService);

  cartService = inject(CartService);

  public products = [
    { id: 1, name: 'Cupcake de Chocolate', price: 9.99, image: 'assets/images/cupcake-chocolate.jpg' },
    { id: 2, name: 'Cupcake de Baunilha', price: 8.99, image: 'assets/images/cupcake-baunilha.jpeg' },
    { id: 3, name: 'Cupcake de Morango', price: 10.99, image: 'assets/images/cupcake-morango.png' },
    { id: 4, name: 'Cupcake de Limão', price: 9.49, image: 'assets/images/cupcake-limao.jpg' },
    { id: 5, name: 'Cupcake de Cenoura', price: 8.99, image: 'assets/images/cupcake-cenoura.jpg' },
    { id: 6, name: 'Cupcake de Frutas Vermelhas', price: 11.99, image: 'assets/images/cupcake-frutas-vermelhas.jpg' },
    { id: 7, name: 'Cupcake de Caramelo', price: 10.49, image: 'assets/images/cupcake-caramelo.jpg' }
  ];

  constructor() {
    // this.cupcakeService.getCupcakes().subscribe((cupcakes) => {
    //   this.products = cupcakes;
    // });
  }

  addToCart(product: { id: number, name: string, price: number, image: string }) {
    this.cartService.addToCart(product);
  }

  buyNow(product: any) {
    this.cartService.addToCart(product);
    this._router.navigate(['/cart']);
  }
}
