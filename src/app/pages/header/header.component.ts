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
import { AuthService } from '../../services/auth-service.service'; // Adicione esta importação

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
  // private _authService = inject(AuthService);

  cartItemCount$!: Observable<number>;
  isAdmin$!: Observable<boolean>;
  isAdmin = false;

  ngOnInit() {
    this.cartItemCount$ = this._cartService.getCartItemCount();
    this.isAdmin = true;
    // this.isAdmin$ = this._authService.isAdmin$ as Observable<boolean>;
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
