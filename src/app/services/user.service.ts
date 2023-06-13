import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserData } from '../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<UserData>;
  currentUser: Observable<UserData>;

  constructor(private http:HttpClient) {

    this.currentUserSubject = new BehaviorSubject<UserData>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   getAllUsers(){
    return this.http.get<{index: number, userData: UserData}[]>('http://localhost:3000/user/users?orderBy=rating:desc').pipe(map(user => {
      return user;
    }));
  }

  loginUser(username:string, password:string): Observable<UserData> {
    return this.http.post<UserData>('http://localhost:3000/user/login', {username: username, password: password}).pipe(map(user => {
      if(user && user.jwt) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }

  registerUser(username:string, email:string, password:string, rating:number): Observable<UserData> {
    return this.http.post<UserData>('http://localhost:3000/user/register', {username: username, email: email, password: password, rating: rating}).pipe(map(user=> {
      return user;
    }))
  }

  logoutUser() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUserById(userId: string): Observable<UserData> {
    return this.http.get<UserData>('http://localhost:3000/user/id/'+userId).pipe(map(user=> {
      return user;
    }))
  }

  getUserByUsername(username: string): Observable<UserData> {
    return this.http.get<UserData>('http://localhost:3000/user/username/'+username).pipe(map(user=> {
      return user;
    }))
  }
}
