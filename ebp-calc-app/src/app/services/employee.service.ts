import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Employee } from "../models/employee";
import { environment } from "../../environments/environment";
import * as moment from 'moment';
import {map} from "rxjs/operators";

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

  saveNewEmployeeWithPossibleDependents(employee: Employee): Observable<Employee> {
    const url = `${environment.backendUrl}/employee`;
    return this.http.post<Employee>(url, {
      employee
    }).pipe(map(e => new Employee(e)));
  }
}
