import { Injectable } from '@angular/core';
import { UserInfo } from '../core/models/user-account-models';
import { AuthService } from '../core/services/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService  { 
  private trainingModalOpenSubject = new Subject<boolean>();
  modalOpen$ = this.trainingModalOpenSubject.asObservable();
  

  constructor(private authService: AuthService) {}

  userRoute(): string {

    const user = this.authService.getItem('user');
    let redirectUrl: string = ''; // Default fallback route

    if (user) {
      switch (user?.Role.toLowerCase()) {
        case 'admin':
          redirectUrl = '/admin';
          break;
        case 'hr':
          redirectUrl = '/hr';
          break;
        case 'trainer':
          redirectUrl = '/trainer';
          break;
        case 'manager':
          redirectUrl = '/manager';
          break;
      }
    }

    return redirectUrl;
  } 

  open() {
    this.trainingModalOpenSubject.next(true);
  }

  close() {
    this.trainingModalOpenSubject.next(false);
  }
}
