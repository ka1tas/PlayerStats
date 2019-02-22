import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { FavouriteComponent } from '../favourite/favourite.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { UserService } from '../../services/user.service';

fdescribe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
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
      fixture = TestBed.createComponent(HomepageComponent);
      component = fixture.componentInstance;

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;

    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Search with valid inputs',async(()=> {
    component.searchform.controls['playername'].setValue('dhoni');
    expect(component.searchform.valid).toBeTruthy();
  }));

  it('Search with invalid inputs',async(()=> {
    component.searchform.controls['playername'].setValue('dhoni007');
    expect(component.searchform.valid).toBeFalsy();
  }));

  it('Search with empty inputs',async(()=> {
    component.searchform.controls['playername'].setValue('');
    expect(component.searchform.valid).toBeFalsy();
  }));

});
