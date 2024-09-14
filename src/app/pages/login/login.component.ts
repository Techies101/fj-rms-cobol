import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { AuthService } from '../../core/services/auth.service';
import { Account, UserInfo } from '../../core/models/user-account-models';
import { SharedService } from '../../shared/shared.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  loading = false;
  userInfo: UserInfo[] = [];

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private sharedService: SharedService) {}

  onSignIn() {

    const user: Account = {
      email: this.email,
      password: this.password
    }

    // Check if email and password are provided
    if (!user.email || !user.password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter both email and password.',
      });
      return;
    }
    
    // Display loading spinner
    Swal.fire({
      title: 'Loading...',
      // text: 'Please wait while we verify your credentials.',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false
    });

   
    this.authService.login(user).subscribe({
      next: (response: UserInfo[] | null) => {
        setTimeout(() => {
          if (response) {
            
             // Close loading spinner
            Swal.close();

            // Display success message
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Login successful!',
            }).then(() => {
              // Redirect based on user role
              this.redirectUser();
            });

          } else {
            // Close loading spinner
            Swal.close();

            // Display error message for invalid credentials
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Invalid email or password.',
            });
          }
        }, 3000)
      }
    })

  }

  redirectUser(): void {
    const route: string = this.sharedService.userRoute()
    this.router.navigateByUrl(route);
  }
  

}

