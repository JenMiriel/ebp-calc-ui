import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import {catchError, take, tap} from "rxjs/operators";
import { EMPTY } from "rxjs";
import { Employee } from "../../models/employee";
import { Settings } from "../../models/settings";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[] | undefined;
  appSettings: Settings;

  constructor(private employeeService: EmployeeService,
              private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.settingsService.getSettings()
      .pipe(
        take(1),
        tap(data => {
          this.appSettings = data[0];
          console.log(data);
        }),
        catchError(() => EMPTY),
      ).subscribe();

    this.employeeService.getAllEmployees()
      .pipe(
        tap(data => {
          this.employeeList = data;
        }),
        catchError(() => EMPTY),
      ).subscribe();

  }

}
