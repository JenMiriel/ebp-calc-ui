import * as moment from "moment";
import { Employee } from "./employee";

export class Dependent {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: moment.Moment | string;
  isSpouse: boolean;
  employeeId: number;
  benefitCostDependent: number;

  constructor(init?: Partial<Dependent>) {
    Object.assign(this, init);
  }
}
