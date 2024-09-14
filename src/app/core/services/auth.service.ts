import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Account, UserInfo } from '../models/user-account-models';
import { UserAccounts, UserLogin } from '../models/table-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl 

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); // current user data 

  currentUser$: Observable<UserInfo | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(user: Account): Observable<UserInfo[] | null> {

    const params = new HttpParams()
    .set('username', user.email)
    .set('password', user.password)

    // Login
    return this.http.get<UserLogin[]>(`${this.apiUrl}/Login/Userlogin`, {params}).pipe(
      map(users => {
        if (users) {
          if(Array.isArray(users)){
            this.currentUserSubject.next(users[0]);
            this.saveToken('mock-token');
            this.setItem('user', JSON.stringify(users[0]));
            return this.currentUserSubject.value;
          }
          this.currentUserSubject.next(users);
          this.saveToken('mock-token');
          this.setItem('user', JSON.stringify(users));
          return this.currentUserSubject.value;
        } else {
          // User not found
          this.currentUserSubject.next(null);
          return null;
        }
      }))
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.deleteToken();
    this.removeItem('user');
  }

  isLoggedIn(): boolean {
    // return !!this.currentUserSubject.value;
    return !!this.getToken();
  }

  getCurrentUser(): UserInfo | null {
    return this.currentUserSubject.value;
  }

  saveToken(token: string): void {
    document.cookie = `authToken=${token}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  }

  getToken(): string | null {
    const match = document.cookie.match(new RegExp('(^| )authToken=([^;]+)'));
    return match ? match[2] : null;
  }

  deleteToken(): void {
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  }

  getItem(key: string): UserLogin | null {
    const userInfoStr = localStorage.getItem(key);
    const user: UserLogin = JSON.parse(userInfoStr!);
    return user;
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  isAuthorized(userRole: string): boolean {
    const user = this.getItem('user');
    if (!user) return false;
    const role = userRole.includes(user.Role.toUpperCase());
    // const modulesAccess = allowedModulesAccess.some(module => allowedModulesAccess.includes(module));

    if (role) {
      return true;
    }
    
    return false;
  }
}
