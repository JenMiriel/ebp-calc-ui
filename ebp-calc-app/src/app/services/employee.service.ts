import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Employee } from "../models/employee";
import { environment } from "../../environments/environment";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getAllEmployees(): Observable<Employee[]> {
    const url = `${environment.backendUrl}/employee`;
    return this.http.get<Employee[]>(url).pipe();

  }

  getAllEmployeesWithDependents(): Observable<Employee[]> {
    const url = `${environment.backendUrl}/employee/dependents`;
    return this.http.get<Employee[]>(url).pipe();

  }
}
