import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
    <mat-card>
      <mat-card-title>Authentication Simulation</mat-card-title>
      <mat-card-content>
        <p>Click sign in to simulate route-guard protected navigation.</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="login()">Sign In</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class LoginComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  login(): void {
    this.authService.login();
    this.router.navigate(['/employees']);
  }
}
