import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  json: any;
  error:any;
  emailPattern = "^[a-zA-Z0-9]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$";
  status = {
    loginStatus: true,

  };

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private authService: AuthService) { }

  loginform = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required,
      Validators.minLength(5),
      Validators.pattern(this.emailPattern)
      ]),
    password: new FormControl(
      '',
      [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(40)]),
  });



  ngOnInit() {
  }

  login() {
    this.json = this.loginform.value;
    console.log(this.json);

    this.userService.login(this.json).subscribe(
      data => {
        console.log(data);
        if (data.token) {
          this.status.loginStatus=false;
          this.authService.login();
          this.authService.setToken(data.token);
          this.router.navigate(['/home']);
        }
      },
      error => {
       if(error.error.message=="Email or Password did not match"){
       this.status.loginStatus=false;
      }
      else{
        this.error=true;
        console.log(error);
      }
      });
    }

}
