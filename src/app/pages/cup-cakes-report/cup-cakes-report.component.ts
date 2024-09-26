import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CupcakeService } from '../../services/cup-cake.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cup-cakes-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cup-cakes-report.component.html',
  styleUrl: './cup-cakes-report.component.scss'
})
export class CupCakesReportComponent implements OnInit {
  // private _cupcakeService = inject(CupcakeService);
  private _location = inject(Location);

  sales: any[] = [];
  filteredSales: any[] = [];
  startDate: string = '';
  endDate: string = '';

  ngOnInit() {
    // this.loadSales();
  }

  // loadSales() {
  //   this.cupcakeService.getSales().subscribe(
  //     sales => {
  //       this.sales = sales;
  //       this.applyFilter();
  //     },
  //     error => console.error('Erro ao carregar vendas:', error)
  //   );
  // }

  applyFilter() {
    this.filteredSales = this.sales.filter(sale => {
      const saleDate = new Date(sale.date);
      const start = this.startDate ? new Date(this.startDate) : null;
      const end = this.endDate ? new Date(this.endDate) : null;

      return (
        (!start || saleDate >= start) &&
        (!end || saleDate <= end)
      );
    });
  }

  onBack() {
    this._location.back();
  }
}
