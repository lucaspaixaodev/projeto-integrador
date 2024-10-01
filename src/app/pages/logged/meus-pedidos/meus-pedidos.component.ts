import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pedido {
  id: number;
  data: Date;
  status: string;
  total: number;
}

@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meus-pedidos.component.html',
  styleUrl: './meus-pedidos.component.scss'
})
export class MeusPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];

  ngOnInit() {
    // Simular a obtenção de pedidos de um serviço
    this.pedidos = [
      { id: 1, data: new Date(2024, 2, 1), status: 'Entregue', total: 150.00 },
      { id: 2, data: new Date(2024, 2, 15), status: 'Em processamento', total: 200.50 },
      { id: 3, data: new Date(2024, 3, 1), status: 'Enviado', total: 75.99 },
    ];
  }
}
