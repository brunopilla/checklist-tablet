import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Component({
  template: ''
})
export class LogoutComponent {
  constructor(private authService: LoginService, private router: Router) {
    this.logout();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); 
  }
}
