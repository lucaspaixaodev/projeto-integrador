import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router, RouterModule } from '@angular/router';

interface PedidoItem {
  nome: string;
  quantidade: number;
  preco: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private _cartService = inject(CartService);
  private _router = inject(Router);

  fullName: string = '';
  address: string = '';
  city: string = '';
  zipCode: string = '';
  metodoPagamento: string = '';
  cardNumber: string = '';
  cardName: string = '';
  expirationDate: string = '';
  cvv: string = '';

  mostrarModal: boolean = false;

  itensPedido: PedidoItem[] = [];

  ngOnInit() {
    this.itensPedido = this._cartService.getCartItems().map(item => ({
      nome: item.name,
      quantidade: item.quantity,
      preco: item.price
    }));
  }

  get totalPedido(): number {
    return this._cartService.getCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  abrirModalResumo(form: NgForm) {
    if (form.valid) {
      this.mostrarModal = true;
    } else {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  enviarPedido() {
    const numeroWhatsApp = '5564996421217';
    const mensagem = this.criarMensagemPedido();
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank');
    this.fecharModal();
  }

  criarMensagemPedido(): string {
    let mensagem = `Olá! Gostaria de fazer um pedido:\n\n`;
    mensagem += `Itens do Pedido:\n`;
    this.itensPedido.forEach(item => {
      mensagem += `${item.nome} - Quantidade: ${item.quantidade} - Preço: R$ ${item.preco.toFixed(2)}\n`;
    });
    mensagem += `\nTotal do Pedido: R$ ${this.totalPedido.toFixed(2)}\n\n`;
    mensagem += `Nome: ${this.fullName}\n`;
    mensagem += `Endereço: ${this.address}\n`;
    mensagem += `Cidade: ${this.city}\n`;
    mensagem += `CEP: ${this.zipCode}\n`;
    mensagem += `Método de Pagamento: ${this.getMetodoPagamentoTexto()}\n`;

    if (this.metodoPagamento === 'cartao_credito' || this.metodoPagamento === 'cartao_debito') {
      mensagem += `Número do Cartão: **** **** **** ${this.cardNumber.slice(-4)}\n`;
      mensagem += `Nome no Cartão: ${this.cardName}\n`;
    }

    return mensagem;
  }

  getMetodoPagamentoTexto(): string {
    switch(this.metodoPagamento) {
      case 'cartao_credito':
        return 'Cartão de Crédito';
      case 'cartao_debito':
        return 'Cartão de Débito';
      case 'pix':
        return 'PIX';
      case 'pagamento_entrega':
        return 'Pagamento na Entrega';
      default:
        return '';
    }
  }

  isCartaoSelecionado(): boolean {
    return this.metodoPagamento === 'cartao_credito' || this.metodoPagamento === 'cartao_debito';
  }

  voltarAoCarrinho() {
    this._router.navigate(['/cart']);
  }
}
