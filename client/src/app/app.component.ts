import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dashboard';
  isDropdownOpen: boolean = false;
  constructor(public router: Router) {}
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  // Add a helper method to check if the current route is 'login'
  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }
  logout(): void {
    // Implement logout functionality
    console.log('Logging out...');
    // Redirect to login page or clear session
  }
}
