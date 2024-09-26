import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CartItem } from '../../interfaces/cart-item.interface';

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
  private _router = inject(Router);
  private _cartService = inject(CartService);

  cartItems: CartItem[] = [];

  ngOnInit(): void {
    this.cartItems = this._cartService.getCartItems();
  }

  removeItem(item: CartItem): void {
    this._cartService.removeFromCart(item.id);
    this.cartItems = this._cartService.getCartItems();
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this._cartService.updateQuantity(item.id, item.quantity - 1);
    } else {
      this.removeItem(item);
    }
    this.cartItems = this._cartService.getCartItems();
  }

  increaseQuantity(item: CartItem): void {
    this._cartService.updateQuantity(item.id, item.quantity + 1);
    this.cartItems = this._cartService.getCartItems();
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  checkout(): void {
    console.log('Finalizando a compra...');
  }

  navigateToHome(): void {
    this._router.navigate(['']);
  }
}
