import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',

  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  signupurl = "http://localhost:8083/api/v1/userservice/adduser";
  loginurl = "http://localhost:8083/api/v1/userservice/login";

  constructor(private http: HttpClient) { }

  addUser(json): Observable<any> {
    return this.http.post<any>(this.signupurl, json, httpOptions);
  }

  login(json): Observable<any> {
    return this.http.post<any>(this.loginurl, json, httpOptions);
  }

}
