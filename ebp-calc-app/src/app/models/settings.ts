interface ISettings {
  insuranceName: string;
  employeeCost: number;
  dependantCost: number;
  discountString: string;
  discountPercentage: number;
}

export class Settings {
  public insuranceName: string = '';
  public employeeCost: number = 1000;
  public dependantCost: number = 500;
  public discountString: string = '';
  public discountPercentage: number = 0;

  constructor(attr?: ISettings) {
    if (!attr) return
    for (let key in attr) {
      if (key in this) {
        this[key] = attr[key]
      }
    }
  }
}
