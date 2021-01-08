import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import { catchError, tap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { Employee } from "../../models/employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[] | undefined;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.employeeService.getAllEmployees()
      .pipe(
        tap(data => {
          this.employeeList = data;
          console.log(this.employeeList);
        }),
        catchError(() => EMPTY),
      ).subscribe();
  }

}
