import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  emailPattern = "^[a-zA-Z0-9]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$";
  error = false;
  status = {
    signupStatus: false,
    emailExist: false
  };
  json: any;

  constructor(private userService: UserService) { }

  signupform = new FormGroup({
    name: new FormControl(
      '',
      [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
      ]),
    email: new FormControl(
      '',
      [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(250),
      Validators.pattern(this.emailPattern)
      ]),


    password: new FormControl(
      '',
      [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25)]),

  });

  ngOnInit() {
  }


  signup() {
    this.json = this.signupform.value;
    console.log(this.json);

    this.userService.addUser(this.json).subscribe(data => {
      console.log(data);

      if (data.message == "User signuped successfully") {
        this.status.emailExist = false;
        this.error = false;
        this.status.signupStatus = true;
        this.signupform.reset();
      }
    },
      error => {
        console.log(error);
        if (error.error.message == "Email already exists") {
          this.status.emailExist = true;
          this.error = false;
          this.status.signupStatus = false;
        }
        else {
          this.error = true;
          this.status.emailExist = false;
          this.status.signupStatus = false;
        }
      });

  }

}
