import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { CommonModule } from '@angular/common';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    CommonModule
  ],
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor() { }

  ngOnInit(): void {
    // Aqui você deve carregar os itens do carrinho, possivelmente de um serviço
    this.cartItems = [
      { id: 1, name: 'Cupcake de Chocolate', price: 5.99, quantity: 2 },
      { id: 2, name: 'Cupcake de Baunilha', price: 4.99, quantity: 1 },
    ];
  }

  removeItem(item: CartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(item);
    }
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  checkout(): void {
    // Implemente a lógica de finalização da compra aqui
    console.log('Finalizando a compra...');
  }
}
