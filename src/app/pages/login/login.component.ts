import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
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
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _formBuilder = inject(FormBuilder);

  loginForm: FormGroup;

  mostrarModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  constructor() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  navigateToRegister() {
    this._router.navigate(['/register']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this._authService.login(email, password).subscribe(
        response => {
          console.log('Login bem-sucedido', response);
          this.mostrarModal = true;
          this.modalTitle = 'Login Realizado';
          this.modalMessage = 'Você foi logado com sucesso!';
        },
        error => {
          console.error('Erro no login', error);
          this.mostrarModal = true;
          this.modalTitle = 'Erro no Login';
          this.modalMessage = 'Credenciais inválidas. Por favor, tente novamente.';
        }
      );
    } else {
      this.mostrarModal = true;
      this.modalTitle = 'Formulário Inválido';
      this.modalMessage = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  fecharModal() {
    this.mostrarModal = false;
    if (this.modalTitle === 'Login Realizado') {
      this._router.navigate(['/']);
    }
  }

  navigateTo(path: string) {
    this._router.navigate([`/${path}`]);
  }
}
