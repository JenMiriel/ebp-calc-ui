import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Settings } from "../models/settings";
import { environment } from "../../environments/environment";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) {
  }

  getSettings(): Observable<Settings> {
    const url = `${environment.backendUrl}/settings`;
    return this.http.get<Settings>(url).pipe();
  }
}
