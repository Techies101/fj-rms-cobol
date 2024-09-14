import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service'
import { UserInfo } from '../models/user-account-models';
import { SharedService } from '../../shared/shared.services';

export const AuthGuard: CanActivateFn = (activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Auth Guard check - isLoggedIn:', authService.isLoggedIn());
  
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}

export const LoginGuard: CanActivateFn = (activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const sharedService = inject(SharedService);
  const router = inject(Router);

  console.log('Login Guard check - isLoggedIn:', authService.isLoggedIn());
  const route: string = sharedService.userRoute();
  
  if (authService.isLoggedIn()) {
    router.navigateByUrl(route);
    return false;
  } else {
    return true;
  }
}

export const RoleGuard: CanActivateFn = (activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // const allowedModulesAccess = activatedRoute.data['ModuleAccess'] as string[];
  const userRole = activatedRoute.data['role'] as string;
  const isUserAuthorized= authService.isAuthorized(userRole);

  console.log('Role Guard check - isAuthorized:', isUserAuthorized);
  
  if (isUserAuthorized) {
    return true;
  } else {
    router.navigate(['/access-denied']);
    return false;
  }
}

export const TableGuard: CanActivateFn = (activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userRole = authService.getItem('user')?.Role;
  const accessingUrl = state.url.split("/")[1];

  console.log(userRole === accessingUrl)

  if (userRole === 'admin' || userRole === accessingUrl) {
    return true;
  } else if (userRole !== accessingUrl) {
    router.navigate(['/app-error']);
    return false;
  } else {
    return false;
  }
}
