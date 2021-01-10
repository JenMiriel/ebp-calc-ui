import * as moment from 'moment';
import { Dependent } from "./dependent";

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: moment.Moment;
  payRate: number;
  insured: boolean;
  dependents?: Dependent;



  constructor(init?: Partial<Employee>) {
    Object.assign(this, init);
  }
}
