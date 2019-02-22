import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from '../signup/signup.component';
import { FavouriteComponent } from '../favourite/favourite.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { UserService } from '../../services/user.service';


fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de : DebugElement;
  let el : HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent,FavouriteComponent, SignupComponent, HomepageComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers : [UserService]
    })
    .compileComponents().then(() =>{
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;

    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login with valid inputs',async(()=> {
    component.loginform.controls['email'].setValue('s@g.com');
    component.loginform.controls['password'].setValue('12345');
    expect(component.loginform.valid).toBeTruthy();
  }));

  it('login with empty inputs',async(()=> {
    component.loginform.controls['email'].setValue('');
    component.loginform.controls['password'].setValue('');
    expect(component.loginform.valid).toBeFalsy();
  }));

   it('login with invalid email',async(()=> {
    component.loginform.controls['email'].setValue('1');
    component.loginform.controls['password'].setValue('12345');
    expect(component.loginform.valid).toBeFalsy();
  }));

  
  it('login with invalid Password',async(()=> {
    component.loginform.controls['email'].setValue('saasa@gka.ask');
    component.loginform.controls['password'].setValue('12');
    expect(component.loginform.valid).toBeFalsy();
  }));


  it('should call the login method', async(()=> {
     component.loginform.controls['email'].setValue('saikat@gmail.com');
    component.loginform.controls['password'].setValue('12345'); 
    fixture.detectChanges();
    spyOn(component, 'login');
    el =fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.login).toHaveBeenCalledTimes(1);
  })); 


  it('form should call service', () => {
    let service=TestBed.get(UserService);
    let spy=spyOn(service,'login');
    component.loginform.get('email').setValue('s@g.com');
    component.loginform.get('password').setValue('12345');
    let loginButton=fixture.debugElement.query(By.css('#loginbutton'));
    loginButton.triggerEventHandler('click',null);
    expect(spy).toHaveBeenCalled();
  });

});
