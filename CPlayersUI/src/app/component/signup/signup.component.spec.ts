import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { LoginComponent } from '../login/login.component';
import { DebugElement } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FavouriteComponent } from '../favourite/favourite.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { UserService } from '../../services/user.service';


fdescribe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
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
      fixture = TestBed.createComponent(SignupComponent);
      component = fixture.componentInstance;

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;

    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Signup with valid inputs',async(()=> {
    component.signupform.controls['name'].setValue('saikat');
    component.signupform.controls['email'].setValue('ss@gg.com');
    component.signupform.controls['password'].setValue('12345');
    expect(component.signupform.valid).toBeTruthy();
  }));

  it('Signup with empty inputs',async(()=> {
    component.signupform.controls['name'].setValue('');
    component.signupform.controls['email'].setValue('');
    component.signupform.controls['password'].setValue('');
    expect(component.signupform.valid).toBeFalsy();
  }));

   it('Signup with invalid email',async(()=> {
    component.signupform.controls['name'].setValue('saikat');
    component.signupform.controls['email'].setValue('1');
    component.signupform.controls['password'].setValue('12345');
    expect(component.signupform.valid).toBeFalsy();
  }));

  
  it('Signup with invalid Password',async(()=> {
    component.signupform.controls['name'].setValue('saikat');
    component.signupform.controls['email'].setValue('saasa@gka.ask');
    component.signupform.controls['password'].setValue('12');
    expect(component.signupform.valid).toBeFalsy();
  }));

  it('Signup with invalid name',async(()=> {
    component.signupform.controls['name'].setValue('012345678901234567890123456789012345678901234567890123456789');
    component.signupform.controls['email'].setValue('saasa@gka.ask');
    component.signupform.controls['password'].setValue('12');
    expect(component.signupform.valid).toBeFalsy();
  }));


  it('should call the Signup method', async(()=> {
    component.signupform.controls['name'].setValue('saikat');
     component.signupform.controls['email'].setValue('saikat@gmail.com');
    component.signupform.controls['password'].setValue('12345'); 
    fixture.detectChanges();
    spyOn(component, 'signup');
    el =fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.signup).toHaveBeenCalledTimes(1);
  })); 


  it('form should call service', () => {
    let service=TestBed.get(UserService);
    let spy=spyOn(service,'addUser');
    component.signupform.controls['name'].setValue('saikat');
     component.signupform.controls['email'].setValue('saikat@gmail.com');
    component.signupform.controls['password'].setValue('12345'); 
    let loginButton=fixture.debugElement.query(By.css('#signupbutton'));
    loginButton.triggerEventHandler('click',null);
    expect(spy).toHaveBeenCalled();
  });

});
