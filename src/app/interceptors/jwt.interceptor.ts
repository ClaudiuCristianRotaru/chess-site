import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { UserService } from '../services/user.service';
import { UserData } from '../models/user-data';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  user?: UserData | null;
  constructor(private userService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.userService.currentUser.subscribe(x => this.user = x);
    console.log("intercepted");
    let token = this.user? this.user.id : 'null';
    console.log(token);
    const newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(newRequest);
  }
}
