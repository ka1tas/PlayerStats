import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn:boolean = false;
  userId: number;
  token = 'jwtToken';
  tokenValue: any;

  constructor(private router: Router) { }

  login() {
    console.log('"Inside auth service login()"');
    this.loggedIn = true;  
    this.router.navigate(['/home']);

  }

  

  logout() {
    console.log("Inside auth service logout()");
    this.loggedIn = false;
    sessionStorage.removeItem(`${this.token}`);
    this.router.navigate(['/login']);
    this.userId=null;
  }

  setLoggedIn(loggedIn: any) {
    this.loggedIn = loggedIn;
  }

  getloggedIn() {
    return this.loggedIn;
  }

  getUserId() {
    return this.userId;
  }


  setUserId(userId: any) {
    this.userId = userId;
  }

  setToken(tokenvalue) {
    sessionStorage.setItem(`${this.token}`, tokenvalue);
  }

  getToken() {
    sessionStorage.getItem(`${this.token}`);
  }
 
 

}
