import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { SubHeaderComponent } from './shared/components/sub-header/sub-header.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './features/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { AnalyticsComponent } from './features/hr/analytics/analytics.component';
import { TrainerComponent } from './features/trainer/trainer.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
