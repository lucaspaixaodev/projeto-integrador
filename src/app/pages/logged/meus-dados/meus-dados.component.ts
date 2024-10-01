import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meus-dados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meus-dados.component.html',
  styleUrl: './meus-dados.component.scss'
})
export class MeusDadosComponent implements OnInit {
  usuario = {
    nome: '',
    email: '',
    senha: ''
  };

  ngOnInit() {
    // Aqui você deve carregar os dados do usuário de um serviço
    // Por enquanto, vamos usar dados de exemplo
    this.usuario = {
      nome: 'João Silva',
      email: 'joao@exemplo.com',
      senha: '********'
    };
  }

  salvarDados() {
    // Aqui você deve implementar a lógica para salvar os dados
    console.log('Dados salvos:', this.usuario);
    // Chamar um serviço para atualizar os dados no backend
  }
}
