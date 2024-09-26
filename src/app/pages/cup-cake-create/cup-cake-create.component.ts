import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CupcakeService } from '../../services/cup-cake.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cup-cake-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cup-cake-create.component.html',
  styleUrl: './cup-cake-create.component.scss'
})
export class CupCakeCreateComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _activatedRoute = inject(ActivatedRoute);
  // private _router = inject(Router);
  // private _cupcakeService = inject(CupcakeService);
  private _location = inject(Location);

  cupcakeForm: FormGroup;
  isEditMode = false;
  cupcakeId: number | null = null;
  categorias: string[] = [];
  imagemPreview: string | ArrayBuffer | null = null;

  constructor() {
    this.cupcakeForm = this._fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      preco: ['', [Validators.required, Validators.min(0)]],
      imagem: [null]
    });
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.cupcakeId = +params['id'];
        this.loadCupcake(this.cupcakeId);
      }
    });
  }

  loadCupcake(id: number) {
    // this.cupcakeService.getCupcake(id).subscribe(
    //   cupcake => {
    //     this.cupcakeForm.patchValue(cupcake);
    //     this.imagemPreview = cupcake.imagem;
    //   },
    //   error => console.error('Erro ao carregar cupcake:', error)
    // );
  }

  onSubmit() {
    if (this.cupcakeForm.valid) {
      const cupcakeData = this.cupcakeForm.value;
      if (this.isEditMode && this.cupcakeId) {
        // this.cupcakeService.updateCupcake(this.cupcakeId, cupcakeData).subscribe(
        //   () => this.router.navigate(['/admin/cupcakes']),
        //   error => console.error('Erro ao atualizar cupcake:', error)
        // );
      } else {
        // this.cupcakeService.createCupcake(cupcakeData).subscribe(
        //   () => this.router.navigate(['/admin/cupcakes']),
        //   error => console.error('Erro ao criar cupcake:', error)
        // );
      }
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.cupcakeForm.patchValue({ imagem: file });
      this.cupcakeForm.get('imagem')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onBack() {
    this._location.back();
  }
}
