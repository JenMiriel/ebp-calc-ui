import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from "../../services/employee.service";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Employee } from "../../models/employee";
import { Dependent } from "../../models/dependent";

let emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {
  @Input() name;

  employeeInfoForm = this.fb.group({
    employeeFirstName: [''],
    employeeLastName: [''],
    employeeBirthdate: [''],
    employeePayRate: [''],
    employeeHasInsurance: [''],
      d1FirstName: [''],
      d1LastName: [''],
      d1Birthdate: [''],
      d1IsSpouse: [''],
      d2FirstName: [''],
      d2LastName: [''],
      d2Birthdate: [''],
      d2IsSpouse: ['']
  });



  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
  }


  submit() {
    console.log('submitted new empl clicked');
    console.log(this.employeeInfoForm.value);
    this.createNewEmployeeAndDependents()
  }

  createNewEmployeeAndDependents()
  {
    var newDependent1 = new Dependent({
        firstName: this.employeeInfoForm.controls['d1FirstName'].value,
        lastName: this.employeeInfoForm.controls['d1LastName'].value,
        birthDate: this.employeeInfoForm.controls['d1Birthdate'].value,
        isSpouse: this.employeeInfoForm.controls['d1IsSpouse'].value
      });
    var newDependent2 = new Dependent({
        firstName: this.employeeInfoForm.controls['d2FirstName'].value,
        lastName: this.employeeInfoForm.controls['d2LastName'].value,
        birthDate: this.employeeInfoForm.controls['d2Birthdate'].value,
        isSpouse: this.employeeInfoForm.controls['d2IsSpouse'].value
    });

    var newEmployee = new Employee({
      firstName: this.employeeInfoForm.controls['employeeFirstName'].value,
      lastName: this.employeeInfoForm.controls['employeeFirstName'].value,
      birthDate: this.employeeInfoForm.controls['employeeFirstName'].value,
      payRate: this.employeeInfoForm.controls['employeeFirstName'].value,
      insured: this.employeeInfoForm.controls['employeeFirstName'].value,
      dependents: [newDependent1, newDependent2]
    });

    this.employeeService.saveNewEmployeeWithPossibleDependents(newEmployee);

  }

}
