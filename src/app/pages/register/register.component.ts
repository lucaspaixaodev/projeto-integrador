import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  mostrarModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  onSubmit() {
    if (this.password === this.confirmPassword) {
      // Simular um registro bem-sucedido
      this.mostrarModal = true;
      this.modalTitle = 'Cadastro Realizado';
      this.modalMessage = 'Seu cadastro foi efetuado com sucesso.';
    } else {
      this.mostrarModal = true;
      this.modalTitle = 'Erro no Cadastro';
      this.modalMessage = 'As senhas não coincidem. Por favor, tente novamente.';
    }
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  navigateToLogin() {
    // Lógica para navegar para a página de login
  }
}

