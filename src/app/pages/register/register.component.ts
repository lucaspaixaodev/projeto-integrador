import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public name: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';

  constructor(private router: Router) {}

  public navigateToLogin() {
    this.router.navigate(['/login']);
  }

  public onSubmit() {
    console.log(this.name, this.email, this.password, this.confirmPassword);
  }
}
