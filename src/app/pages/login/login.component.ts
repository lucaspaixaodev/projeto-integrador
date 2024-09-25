import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public readonly email = new FormControl('', [Validators.required, Validators.email]);
  public readonly errorMessage = signal('');
  public hide = signal(true);

  constructor() {
    console.log('LoginComponent inicializado');

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.atualizarMensagemDeErro());
  }

  public atualizarMensagemDeErro() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('O e-mail é obrigatório');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('O e-mail é inválido');
    }
  }

  public clickEvent(evento: MouseEvent) {
    this.hide.set(!this.hide());
    evento.stopPropagation();
  }
}
