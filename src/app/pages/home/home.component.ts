import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private _router = inject(Router);
  private _productService = inject(ProductService);

  cartService = inject(CartService);

  public products: any[] = [];

  ngOnInit() {
    this._productService.getProducts().subscribe(
      (products) => {
        this.products = products.map(product => ({
          ...product,
          price: parseFloat(product.price)
        }));
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  addToCart(product: { id: number, name: string, price: number, image: string }) {
    this.cartService.addToCart(product);
  }

  buyNow(product: any) {
    this.cartService.addToCart(product);
    this._router.navigate(['/cart']);
  }
}
