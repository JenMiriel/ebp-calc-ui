import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../models/employee";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http: HttpClient) {
  }

  getAllEmployees(): Observable<Employee[]> {
    const url = `${environment.backendUrl}/employee`;
    return this.http.get<Employee[]>(url).pipe();
  }
}
