import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { DisplayBeneficiariesComponent } from './components/display-beneficiaries/display-beneficiaries.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    AddPersonComponent,
    DisplayBeneficiariesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
