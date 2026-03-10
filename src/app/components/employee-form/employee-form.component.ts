import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeePayload } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  editingEmployeeId?: number;
  submitError = '';

  readonly employeeForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', [Validators.required, Validators.minLength(2)]],
    department: ['', [Validators.required]],
    salary: [0, [Validators.required, Validators.min(10000)]],
    joiningDate: ['', [Validators.required]]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (!idFromRoute) {
      return;
    }

    this.editingEmployeeId = Number(idFromRoute);
    this.employeeService.getEmployeeById(this.editingEmployeeId).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue(employee);
      },
      error: (err: Error) => {
        this.submitError = err.message;
      }
    });
  }

  submit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const payload = this.employeeForm.getRawValue() as EmployeePayload;
    const request$ = this.editingEmployeeId
      ? this.employeeService.updateEmployee(this.editingEmployeeId, payload)
      : this.employeeService.addEmployee(payload);

    request$.subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err: Error) => {
        this.submitError = err.message;
      }
    });
  }
}
