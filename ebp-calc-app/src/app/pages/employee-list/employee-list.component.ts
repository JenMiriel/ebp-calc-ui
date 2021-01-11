import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import { catchError, take, tap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { Employee } from "../../models/employee";
import { Settings } from "../../models/settings";
import { SettingsService } from "../../services/settings.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPersonComponent } from "../../components/add-person/add-person.component";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Dependent } from "../../models/dependent";
import { MatTableDataSource } from "@angular/material/table";
import {log} from "util";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class EmployeeListComponent implements OnInit {

  appSettings = new Settings();
  employeeList: Employee[] | undefined;
  displayedColumns: string[] = ['icon', 'name', 'insured', 'payRate', 'benefitCost', 'edit'];
  expandedElementz: Employee | null;

  expandedElement: Dependent | null;
  isTableExpanded = false;

  employeeListDataSource: MatTableDataSource<Employee>;

  constructor(private settingsService: SettingsService,
              private employeeService: EmployeeService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.employeeListDataSource = new MatTableDataSource<Employee>();
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

    this.employeeService.getAllEmployeesWithDependents()
      .pipe(
        tap(data => {
          this.employeeList = data;
          console.log(this.employeeList);
          this.calculateEmployeeBenefitCost(this.employeeList);
        }),
        catchError(() => EMPTY),
      ).subscribe();
  }

  calculateEmployeeBenefitCost(employeeList: Employee[]) {
    employeeList.forEach((employee) => {
      var actualCost = 0;
      if(employee.insured) {
        actualCost = this.appSettings.employeeCost - this.determineDiscount(employee.firstName, employee.lastName);
      }
    });

  }

  determineDiscount(fName: string, lName: string){
    var discount = 0;
    if((fName.charAt(0) === this.appSettings.discountString) ||
      (lName.charAt(0) === this.appSettings.discountString)){
        discount = this.appSettings.discountPercentage * .01;
    }
    return this.appSettings.employeeCost * discount;
  }


  open() {
    const modalRef = this.modalService.open(AddPersonComponent);
    modalRef.componentInstance.name = 'World';
  }

  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.employeeListDataSource.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }

}
