import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems: CartItem[] = [];
  private _cartItemCount = new BehaviorSubject<number>(0);

  constructor() { }

  public getCartItems(): CartItem[] {
    return this._cartItems;
  }

  public getCartItemCount() {
    return this._cartItemCount.asObservable();
  }

  public addToCart(product: { id: number, name: string, price: number }) {
    const existingItem = this._cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this._cartItems.push({ ...product, quantity: 1 });
    }
    this._updateCartItemCount();
  }

  private _updateCartItemCount() {
    const count = this._cartItems.reduce((total, item) => total + item.quantity, 0);
    this._cartItemCount.next(count);
  }
}
