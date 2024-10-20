import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _formBuilder = inject(FormBuilder);

  registerForm: FormGroup;

  mostrarModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  constructor() {
    this.registerForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this._authService.register(username, email, password).subscribe(
        response => {
          console.log('Registro bem-sucedido', response);
          this.mostrarModal = true;
          this.modalTitle = 'Cadastro Realizado';
          this.modalMessage = 'Seu cadastro foi efetuado com sucesso.';
        },
        error => {
          console.error('Erro no registro', error);
          this.mostrarModal = true;
          this.modalTitle = 'Erro no Cadastro';
          this.modalMessage = 'Ocorreu um erro durante o cadastro. Por favor, tente novamente.';
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
    if (this.modalTitle === 'Cadastro Realizado') {
      this._router.navigate(['/login']);
    }
  }

  navigateToLogin() {
    this._router.navigate(['/login']);
  }
}
