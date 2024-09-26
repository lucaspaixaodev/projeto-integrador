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
  public cartItemCount$!: Observable<number>;
  public cartService = inject(CartService);

  constructor(private router: Router) {}

  public ngOnInit() {
    this.cartItemCount$ = this.cartService.getCartItemCount();
  }

  public navigateToHome() {
    this.router.navigate(['/']);
  }

  public navigateToLogin() {
    this.router.navigate(['/login']);
  }

  public navigateToRegister() {
    this.router.navigate(['/register']);
  }

  public navigateToCart() {
    this.router.navigate(['/cart']);
  }

  public navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
}
