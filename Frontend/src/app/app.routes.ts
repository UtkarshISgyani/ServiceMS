import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { UserOrdersComponent } from './users/user-orders/user-orders.component';
import { ProfileComponent } from './users/profile/profile.component';
import { ApprovalRequestsComponent } from './users/approval-requests/approval-requests.component';
import { AllOrdersComponent } from './users/all-orders/all-orders.component';
import { ViewUsersComponent } from './users/view-users/view-users.component';
import { ServiceStoreComponent } from './service/service-store/service-store.component';
import { MaintenanceComponent } from './service/maintenance/maintenance.component';
import { CompleteServiceComponent } from './service/complete-service/complete-service.component';
import { BlockUsersComponent } from './users/block-users/block-users.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: ServiceStoreComponent },
  { path: 'my-orders', component: UserOrdersComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'complete-service', component: CompleteServiceComponent },
  { path: 'approval-requests', component: ApprovalRequestsComponent },
  { path: 'block-users', component: BlockUsersComponent },
  { path: 'all-orders', component: AllOrdersComponent },
  { path: "view-users", component: ViewUsersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: PageNotFoundComponent },
];
