import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    AsyncPipe,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _cartService = inject(CartService);
  private _router = inject(Router);
  private _authService = inject(AuthService);

  cartItemCount$!: Observable<number>;
  isLoggedIn$!: Observable<boolean>;
  isAdmin = false;

  ngOnInit() {
    this.cartItemCount$ = this._cartService.getCartItemCount();
    this.isLoggedIn$ = this._authService.isLoggedIn$;
  }

  navigateTo(path: string) {
    this._router.navigate([`/${path}`]);
  }

  logout() {
    this._authService.logout();
    this.navigateTo('');
  }
}
