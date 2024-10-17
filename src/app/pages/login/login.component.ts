import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _router = inject(Router);
  private _authService = inject(AuthService);

  email: string = 'lucasgpaixao@hotmail.com';
  password: string = 'abc123';

  mostrarModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  navigateToRegister() {
    this._router.navigate(['/register']);
  }

  onSubmit() {
    console.log(this.email, this.password);
    this._authService.login();
    this.mostrarModal = true;
    this.modalTitle = 'Login Realizado';
    this.modalMessage = 'Você foi logado com sucesso!';
  }

  fecharModal() {
    this.mostrarModal = false;
    this._router.navigate(['/']);
  }

  navigateTo(path: string) {
    this._router.navigate([`/${path}`]);
  }
}
