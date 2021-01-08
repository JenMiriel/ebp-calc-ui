import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBeneficiariesComponent } from './display-beneficiaries.component';

describe('DisplayBeneficiariesComponent', () => {
  let component: DisplayBeneficiariesComponent;
  let fixture: ComponentFixture<DisplayBeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayBeneficiariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
