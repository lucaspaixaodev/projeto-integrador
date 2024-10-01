import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Endereco {
  id: number;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  principal: boolean;
}

@Component({
  selector: 'app-meus-enderecos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meus-enderecos.component.html',
  styleUrl: './meus-enderecos.component.scss'
})
export class MeusEnderecosComponent implements OnInit {
  enderecos: Endereco[] = [];

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

  definirEnderecoPrincipal(endereco: Endereco) {
    this.enderecos.forEach(e => e.principal = false);
    endereco.principal = true;
  }
}
