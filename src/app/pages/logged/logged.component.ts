import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MeusDadosComponent } from './meus-dados/meus-dados.component';
import { MeusEnderecosComponent } from './meus-enderecos/meus-enderecos.component';
import { MeusPedidosComponent } from './meus-pedidos/meus-pedidos.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-logged',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MeusPedidosComponent,
    MeusEnderecosComponent,
    MeusDadosComponent,
    HomeComponent
  ],
  templateUrl: './logged.component.html',
  styleUrl: './logged.component.scss'
})
export class LoggedComponent {
  private _router = inject(Router);

  nomeUsuario: string = 'João'; // Substitua por lógica para obter o nome do usuário

  constructor() {
    // Aqui você pode adicionar lógica para obter o nome do usuário
    // Por exemplo, através de um serviço de autenticação
  }

  navigateTo(path: string) {
    this._router.navigate([`/logged/${path}`]);
  }

  navigateToHome(path: string) {
    this._router.navigate([`/${path}`]);
  }
}
