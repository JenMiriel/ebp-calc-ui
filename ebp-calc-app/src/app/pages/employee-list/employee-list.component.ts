import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {catchError, take, tap} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {Employee} from "../../models/employee";
import {Settings} from "../../models/settings";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  appSettings = new Settings();
  employeeList: Employee[] | undefined;
  // masterEmployeeDisplay: new MatTableDataSource();
  displayedColumns: string[] = ['icon', 'name', 'insured', 'payRate', 'benefitCost', 'edit'];


  constructor(private settingsService: SettingsService,
              private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.settingsService.getSettings()
      .pipe(
        take(1),
        tap(data => {
          this.appSettings = data[0];
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

  calculateEmployeeBenefitCost(employee: Employee) {
    var actualCost = 0;
    if(employee.insured) {
      actualCost = this.appSettings.employeeCost - this.determineDiscount(employee);
    }
    return actualCost;
  }

  determineDiscount(employee: Employee){
    var discount = 0;

    if((employee.firstName.charAt(0) === this.appSettings.discountString) ||
      (employee.lastName.charAt(0) === this.appSettings.discountString)){
        discount = this.appSettings.discountPercentage * .01;
    }
    return this.appSettings.employeeCost * discount;
  }

}
