import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {
  private _router = inject(Router);

  totalCupcakes: number = 0;
  bestSellerCupcake: string = '';
  monthSales: number = 0;

  relatorioDeVendas() {
    this._router.navigate(['admin/cupcakes/relatorio']);
  }

  listarCupcakes() {
    this._router.navigate(['/admin/cupcakes']);
  }

  adicionarCupcake() {
    this._router.navigate(['/admin/cupcakes/novo']);
  }

}
