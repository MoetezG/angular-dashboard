import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    // Mock authentication logic
    if (this.email === 'admin@example.com' && this.password === 'password123') {
      // Navigate to the dashboard on successful login
      this.router.navigate(['/dashboard']);
    } else {
      // Display an error message on invalid login
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
  }
}
