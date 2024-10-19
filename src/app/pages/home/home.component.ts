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
    { id: 1, name: 'Cupcake de Chocolate', price: 9.99, image: 'assets/images/cupcake-chocolate.jpg', description: 'Delicioso cupcake de chocolate rico e cremoso, coberto com ganache de chocolate belga e raspas de chocolate amargo.' },
    { id: 2, name: 'Cupcake de Baunilha', price: 8.99, image: 'assets/images/cupcake-baunilha.jpeg', description: 'Cupcake clássico de baunilha com massa macia e aroma irresistível, decorado com buttercream de baunilha e confeitos coloridos.' },
    { id: 3, name: 'Cupcake de Morango', price: 10.99, image: 'assets/images/cupcake-morango.png', description: 'Cupcake fresco de morango com pedaços de fruta na massa, coberto com chantilly de morango e decorado com uma morango fresco.' },
    { id: 4, name: 'Cupcake de Limão', price: 9.49, image: 'assets/images/cupcake-limao.jpg', description: 'Cupcake cítrico de limão siciliano, com cobertura de merengue italiano e raspas de limão caramelizadas.' },
    { id: 5, name: 'Cupcake de Cenoura', price: 8.99, image: 'assets/images/cupcake-cenoura.jpg', description: 'Cupcake úmido de cenoura com especiarias, coberto com frosting de cream cheese e decorado com minicenouras de açúcar.' },
    { id: 6, name: 'Cupcake de Frutas Vermelhas', price: 11.99, image: 'assets/images/cupcake-frutas-vermelhas.jpg', description: 'Cupcake recheado com mix de frutas vermelhas, coberto com mousse de frutas vermelhas e decorado com frutas frescas.' },
    { id: 7, name: 'Cupcake de Caramelo', price: 10.49, image: 'assets/images/cupcake-caramelo.jpg', description: 'Cupcake de caramelo salgado com núcleo de caramelo líquido, coberto com buttercream de caramelo e decorado com flocos de sal marinho.' }
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
