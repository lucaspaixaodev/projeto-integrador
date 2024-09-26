import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _cartService = inject(CartService);
  private _router = inject(Router);

  cartItemCount$!: Observable<number>;

  ngOnInit() {
    this.cartItemCount$ = this._cartService.getCartItemCount();
  }

  navigateToHome() {
    this._router.navigate(['/']);
  }

  navigateToLogin() {
    this._router.navigate(['/login']);
  }

  navigateToRegister() {
    this._router.navigate(['/register']);
  }

  navigateToCart() {
    this._router.navigate(['/cart']);
  }

  navigateToAdmin() {
    this._router.navigate(['/admin']);
  }
}
