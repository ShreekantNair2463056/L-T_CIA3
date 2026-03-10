export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  salary: number;
  joiningDate: string;
}

export interface EmployeePayload {
  name: string;
  email: string;
  role: string;
  department: string;
  salary: number;
  joiningDate: string;
}
