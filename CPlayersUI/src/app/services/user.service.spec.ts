import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('UserService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ ],
    imports: [
      HttpClientModule
    ],
    providers : [UserService]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
