import { Component, inject, OnInit } from '@angular/core';
import { CupcakeService } from '../../services/cup-cake.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cup-cakes-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cup-cakes-list.component.html',
  styleUrls: ['./cup-cakes-list.component.scss']
})
export class CupCakesListComponent implements OnInit {
  // private _cupcakeService = inject(CupcakeService);
  private _router = inject(Router);
  private _location = inject(Location);

  cupcakes: any[] = [];
  filteredCupcakes: any[] = [];
  filterText: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;

  ngOnInit() {
    // this.loadCupcakes();
    // this.loadCategories();
  }

  // loadCupcakes() {
  //   this._cupcakeService.getCupcakes().subscribe(
  //     (data) => {
  //       this.cupcakes = data;
  //       this.applyFilter();
  //     },
  //     (error) => console.error('Erro ao carregar cupcakes:', error)
  //   );
  // }

  // loadCategories() {
  //   this._cupcakeService.getCategories().subscribe(
  //     (data) => {
  //       this.categories = data;
  //     },
  //     (error) => console.error('Erro ao carregar categorias:', error)
  //   );
  // }

  applyFilter() {
    this.filteredCupcakes = this.cupcakes.filter(cupcake =>
      cupcake.nome.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.updatePagination();
  }

  sort(column: string) {
    // Implemente a lógica de ordenação
  }

  editCupcake(id: number) {
    this._router.navigate(['/admin/cupcakes/editar', id]);
  }

  deleteCupcake(id: number) {
  //   if (confirm('Tem certeza que deseja excluir este cupcake?')) {
  //     this._cupcakeService.deleteCupcake(id).subscribe(
  //       () => {
  //         this.loadCupcakes();
  //       },
  //       (error) => console.error('Erro ao excluir cupcake:', error)
  //     );
  //   }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredCupcakes = this.cupcakes.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.cupcakes.length / this.itemsPerPage);
  }

  onBack() {
    this._location.back();
  }
}
