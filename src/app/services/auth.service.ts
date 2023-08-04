import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return sessionStorage.getItem('name')!=null;
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any>("http://localhost:3000/users")
  }

  addUser(data: any): Observable<any[]> {
    return this.http.post<any>("http://localhost:3000/users", data)
  }
}
