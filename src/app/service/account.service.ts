import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:44379/api/';

  private currentUserSource = new BehaviorSubject<IUser>(null);
   currentUserSource$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient,private router:Router) {}

  loadCurrentUser(token: string) {
    var headers = new HttpHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl + 'Account/GetCurrentUser',{headers}).pipe(
      map((user: any) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  login(value: any) {
    return this.http.post(this.baseUrl + 'Account/Login', value).pipe(
      map((user: any) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }
  regster(value: any) {
    return this.http.post(this.baseUrl + 'Account/register', value).pipe(
      map((user: any) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }
  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
  checkEmailExist() {
    return this.http.get(this.baseUrl + 'Account/checkemailexist');
  }
}
