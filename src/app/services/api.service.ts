import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = environment.api;

  constructor(
    private http: HttpClient,
  ) { 
  }

  updateUsers(id: number, form: any): Observable<any> {
    return this.http.put(`${this.url}/users/${id}`, form);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.url}/users/${id}`);
  }
}
