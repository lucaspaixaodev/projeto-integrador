import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../interfaces/order.interface';

@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meus-pedidos.component.html',
  styleUrl: './meus-pedidos.component.scss'
})
export class MeusPedidosComponent implements OnInit {
  pedidos: Order[] = [];

  ngOnInit() {
    // Simular a obtenção de pedidos de um serviço
    this.pedidos = [
      { id: 1, data: new Date(2024, 2, 1), status: 'Entregue', total: 150.00, codigoRastreio: 'BR1234567890BR' },
      { id: 2, data: new Date(2024, 2, 15), status: 'Em processamento', total: 200.50, codigoRastreio: 'BR2345678901BR' },
      { id: 3, data: new Date(2024, 3, 1), status: 'Enviado', total: 75.99, codigoRastreio: 'BR3456789012BR' },
    ];
  }

  rastrearPedido(codigoRastreio: string) {
    // const urlRastreioCorreios = `https://www.linkcorreios.com.br/?id=${codigoRastreio}`;
    const urlRastreioCorreios = `https://rastreamento.correios.com.br/app/index.php`;
    window.open(urlRastreioCorreios, '_blank');
  }
}
