import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const jwtToken = sessionStorage.getItem(`${this.authService.token}`);
        const re = 'http://cricapi.com/api';
      
        if (request.url.search(re) === -1) {

            if (jwtToken) {
                console.log('Token ');
                request = request.clone({
                    setHeaders: {
                        Authorization: `token ${jwtToken}`,
                    }
                });
            }
            console.log(request);
        }
        return next.handle(request);
    }
}
