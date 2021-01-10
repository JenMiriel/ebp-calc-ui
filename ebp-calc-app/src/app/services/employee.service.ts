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

  getAllEmployees(): Observable<any[]> {
    const url = `${environment.backendUrl}/employee`;
    return this.http.get<any[]>(url).pipe();

    // test data
    // const mockEmplArr: Employee[] = [
    //   {id: 1, firstName: 'Lina', lastName: 'Inverse', birthDate: moment(), payRate: 2000, insured: true},
    //   {id: 2, firstName: 'Gourry', lastName: 'Gabriev', birthDate: moment(), payRate: 2000, insured: false},
    //   {id: 3, firstName: 'Zelgadiss', lastName: 'Greywords', birthDate: moment(), payRate: 2000, insured: true},
    // ];
    // return of(mockEmplArr);
  }
}
