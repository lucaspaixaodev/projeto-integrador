import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Adress } from '../../../interfaces/adress.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meus-enderecos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meus-enderecos.component.html',
  styleUrl: './meus-enderecos.component.scss'
})
export class MeusEnderecosComponent implements OnInit {
  enderecos: Adress[] = [];
  enderecoEmEdicao: Adress | null = null;
  mostrarFormularioNovoEndereco = false;
  novoEndereco: Adress | null = null;

  ngOnInit() {
    // Simular dados de endereços (substitua isso por uma chamada de API real)
    this.enderecos = [
      {
        id: 1,
        rua: 'Rua das Flores',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01234-567',
        principal: true
      },
      {
        id: 2,
        rua: 'Avenida Paulista',
        numero: '1000',
        complemento: 'Apto 501',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01310-100',
        principal: false
      }
    ];
  }

  definirEnderecoPrincipal(endereco: Adress) {
    this.enderecos.forEach(e => e.principal = false);
    endereco.principal = true;
  }

  editarEndereco(endereco: Adress) {
    this.enderecoEmEdicao = { ...endereco };
  }

  salvarEdicao() {
    if (this.enderecoEmEdicao) {
      if (this.enderecoEmEdicao.id) {
        // Editando um endereço existente
        const index = this.enderecos.findIndex(e => e.id === this.enderecoEmEdicao!.id);
        if (index !== -1) {
          this.enderecos[index] = { ...this.enderecoEmEdicao };
        }
      } else {
        // Adicionando um novo endereço
        const novoId = Math.max(...this.enderecos.map(e => e.id || 0)) + 1;
        this.enderecoEmEdicao.id = novoId;
        this.enderecos.push({ ...this.enderecoEmEdicao });
      }
      this.enderecoEmEdicao = null;
      this.mostrarFormularioNovoEndereco = false;
    }
  }

  cancelarEdicao() {
    this.enderecoEmEdicao = null;
    this.mostrarFormularioNovoEndereco = false;
  }

  adicionarNovoEndereco() {
    this.novoEndereco = {
      id: 0,
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      principal: false
    };
    this.mostrarFormularioNovoEndereco = true;
  }

  salvarNovoEndereco() {
    if (this.novoEndereco) {
      const novoId = Math.max(...this.enderecos.map(e => e.id || 0)) + 1;
      this.novoEndereco.id = novoId;
      this.enderecos.unshift(this.novoEndereco); // Adiciona no início da lista
      this.novoEndereco = null;
      this.mostrarFormularioNovoEndereco = false;
    }
  }

  cancelarNovoEndereco() {
    this.novoEndereco = null;
    this.mostrarFormularioNovoEndereco = false;
  }
}
