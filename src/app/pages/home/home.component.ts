import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public cartService = inject(CartService);

  public products = [
    { id: 1, name: 'Cupcake de Chocolate', price: 9.99, image: 'assets/images/cupcake-chocolate.jpg' },
    { id: 2, name: 'Cupcake de Baunilha', price: 8.99, image: 'assets/images/cupcake-chocolate.jpg' },
    // Adicione mais produtos conforme necessário
  ];

  constructor() { }

  addToCart(product: { id: number, name: string, price: number }) {
    this.cartService.addToCart(product);
  }
}
