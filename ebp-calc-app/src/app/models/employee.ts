import * as moment from 'moment';

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: moment.Moment;
  payRate: number;
  insured: boolean;



  constructor(init?: Partial<Employee>) {
    Object.assign(this, init);
  }
}
