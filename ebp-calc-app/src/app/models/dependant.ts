import * as moment from "moment";
import { Employee } from "./employee";

export class Dependant {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: moment.Moment | string;

  constructor(init?: Partial<Employee>) {
    Object.assign(this, init);
  }
}
