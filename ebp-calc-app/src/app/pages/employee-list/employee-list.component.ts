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
  grandTotalBenefitsCost = 0;

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
          this.calculateEmployeeBenefitCost(this.employeeList);
        }),
        catchError(() => EMPTY),
      ).subscribe();
  }

  calculateEmployeeBenefitCost(employeeList: Employee[]) {
    employeeList.forEach((employee) =>
    {
      if(employee.insured)
      {
        employee.totalBenefitCost = 0;
        employee.benefitCostEmployee = this.appSettings.employeeCost -
          (this.determineDiscount(employee.firstName, employee.lastName) * this.appSettings.employeeCost);
        employee.totalBenefitCost += employee.benefitCostEmployee;
        employee.dependents.forEach((dependent) =>
        {
          dependent.benefitCostDependent = this.appSettings.dependantCost -
            (this.determineDiscount(dependent.firstName, dependent.lastName) * this.appSettings.dependantCost);
          employee.totalBenefitCost += dependent.benefitCostDependent;
        });
        this.grandTotalBenefitsCost += employee.totalBenefitCost;
      }
    });

  }

  determineDiscount(fName: string, lName: string){
    var discount = 0;
    if((fName.charAt(0) === this.appSettings.discountString) ||
      (lName.charAt(0) === this.appSettings.discountString)){
        discount = this.appSettings.discountPercentage * .01;
    }
    return discount;
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
