import { AlertService } from './shared/services/alert.service';
import { SearchPipe } from './shared/pipe/search.pipe';
import { AuthGuard } from './shared/services/auth.guard';
import { SharedModule } from './../shared/shared.module';
import { AdminRoutes } from './admin.routing';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './shared/services/auth.service';
import { AlertComponent } from './shared/components/alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutes,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    CreatePageComponent,
    EditPageComponent,
    DashboardComponent,
    SearchPipe,
    AlertComponent,
  ],
  providers: [AuthGuard, AlertService],
})
export class AdminModule {}
