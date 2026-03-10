import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Welcome to Employee Management Dashboard</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          Manage employee records with Angular routing, directives, pipes, reactive forms,
          and Angular Material components.
        </p>
      </mat-card-content>
    </mat-card>
  `
})
export class HomeComponent {}
