import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getToken():string {
    return window.localStorage['jwtToken'];
  }

  setToken(token:string):void {
    window.localStorage['jwtToken'] = token;
  }

  removeToken(): void {
    window.localStorage.removeItem('jwtToken');
  }
}
