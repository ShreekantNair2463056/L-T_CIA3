import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of, throwError } from 'rxjs';
import { Employee, EmployeePayload } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly employees$ = new BehaviorSubject<Employee[]>([
    { id: 1, name: 'Anita Rao', email: 'anita.rao@company.com', role: 'Project Manager', department: 'Operations', salary: 1450000, joiningDate: '2021-05-15' },
    { id: 2, name: 'Rahul Iyer', email: 'rahul.iyer@company.com', role: 'Senior Engineer', department: 'Engineering', salary: 980000, joiningDate: '2022-07-01' },
    { id: 3, name: 'Megha Singh', email: 'megha.singh@company.com', role: 'HR Specialist', department: 'Human Resources', salary: 760000, joiningDate: '2023-01-20' }
  ]);

  getEmployees(): Observable<Employee[]> {
    return this.employees$.asObservable().pipe(delay(200));
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.getEmployees().pipe(
      map((employees) => employees.find((employee) => employee.id === id)),
      map((employee) => {
        if (!employee) {
          throw new Error('Employee not found');
        }
        return employee;
      })
    );
  }

  addEmployee(payload: EmployeePayload): Observable<Employee> {
    const nextId = Math.max(...this.employees$.value.map((employee) => employee.id), 0) + 1;
    const employee: Employee = { id: nextId, ...payload };
    this.employees$.next([...this.employees$.value, employee]);
    return of(employee).pipe(delay(200));
  }

  updateEmployee(id: number, payload: EmployeePayload): Observable<Employee> {
    const idx = this.employees$.value.findIndex((employee) => employee.id === id);
    if (idx === -1) {
      return throwError(() => new Error('Unable to update: employee not found'));
    }

    const updatedEmployee: Employee = { id, ...payload };
    const updated = [...this.employees$.value];
    updated[idx] = updatedEmployee;
    this.employees$.next(updated);
    return of(updatedEmployee).pipe(delay(200));
  }

  deleteEmployee(id: number): Observable<void> {
    this.employees$.next(this.employees$.value.filter((employee) => employee.id !== id));
    return of(void 0).pipe(delay(200));
  }
}
