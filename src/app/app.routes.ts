import { Routes } from '@angular/router';
import { HrComponent } from './features/hr/hr.component';
import { AdminComponent } from './features/admin/admin.component';
import { TrainerComponent } from './features/trainer/trainer.component';
import { AppTableComponent } from './shared/components/app-table/app-table.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard, LoginGuard, RoleGuard, TableGuard } from './core/services/auth-guard';
import { ManagerComponent } from './features/manager/manager.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AnalyticsComponent } from './features/hr/analytics/analytics.component';
import { NotFoundComponent } from './pages/error/error.component';
import { UserRole } from './core/types/role.enums';

export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: "login", 
      component: LoginComponent, 
      canActivate: [LoginGuard]
    },
    { path: "admin", 
      component: AdminComponent, 
      canActivate: [AuthGuard, RoleGuard], 
      data: { role: [UserRole.ADMIN]}
    },
    { path: "hr", 
      component: HrComponent, 
      canActivate: [AuthGuard, RoleGuard], 
      data: { role: [UserRole.HR, UserRole.ADMIN, "HR Specialist"]},
    },
    { path: "trainer", 
      component: TrainerComponent, 
      canActivate: [AuthGuard, RoleGuard], 
      data: {role: [UserRole.TRAINER, UserRole.ADMIN]}
    },
    { path: "manager", 
      component: ManagerComponent, 
      canActivate: [AuthGuard, RoleGuard], 
      data: { role: [UserRole.MANAGER, UserRole.ADMIN]}
    },
    

    { path: ":feature/table/Analytics", 
      component: AnalyticsComponent,
      canActivate: [AuthGuard, RoleGuard],
      data: {role: [UserRole.HR, UserRole.ADMIN]}
    },
    { path: ":feature/table/:page", 
      component: AppTableComponent,
      //canActivate: [AuthGuard, TableGuard],
      data: { role: [UserRole.ADMIN, UserRole.HR, UserRole.TRAINER, UserRole.MANAGER]}
    }, //pages that has a table

    { path: 'access-denied', component: AccessDeniedComponent },
    { path: '**', component: NotFoundComponent }
];
