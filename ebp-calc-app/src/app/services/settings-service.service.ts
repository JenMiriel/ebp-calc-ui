import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Settings } from "../models/settings";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SettingsServiceService {

  constructor(private http: HttpClient) {
  }

  getSettings(): Observable<Settings> {
    const url = `${environment.backendUrl}/settings`;
    return this.http.get<Settings>(url).pipe();
  }
}
