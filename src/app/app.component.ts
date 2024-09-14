import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, provideRouter, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

import { AdminComponent } from './features/admin/admin.component';
import { AppTableComponent } from './shared/components/app-table/app-table.component';
import { AppNavComponent } from './shared/components/app-nav/app-nav.component';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AdminComponent, AppTableComponent, AppNavComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})
export class AppComponent {
  isLoginDisplay: boolean = false;
  currentPath: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events to get the current path after navigation
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Update the currentPath with the router's current URL
      this.currentPath = this.router.url;
      
      this.isLoginDisplay = this.currentPath === '/login';
    });
  }
}
