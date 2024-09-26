import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../interfaces/cart-item.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems: CartItem[] = [];
  private _cartItemCount = new BehaviorSubject<number>(0);

  getCartItems(): CartItem[] {
    return this._cartItems;
  }

  getCartItemCount() {
    return this._cartItemCount.asObservable();
  }

  private _updateCartItemCount() {
    const count = this._cartItems.reduce((total, item) => total + item.quantity, 0);
    this._cartItemCount.next(count);
  }

  addToCart(product: { id: number, name: string, price: number, image: string }) {
    const existingItem = this._cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this._cartItems.push({ ...product, quantity: 1 });
    }
    this._updateCartItemCount();
  }

  removeFromCart(productId: number) {
    const index = this._cartItems.findIndex(item => item.id === productId);
    if (index > -1) {
      this._cartItems.splice(index, 1);
      this._updateCartItemCount();
    }
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this._cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this._updateCartItemCount();
      }
    }
  }
}
