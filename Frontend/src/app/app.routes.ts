import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { BookstoreComponent } from './books/bookstore/bookstore.component';
import { UserOrdersComponent } from './users/user-orders/user-orders.component';
import { ProfileComponent } from './users/profile/profile.component';
import { MaintenanceComponent } from './books/maintenance/maintenance.component';
import { ReturnBookComponent } from './books/return-book/return-book.component';
import { ApprovalRequestsComponent } from './users/approval-requests/approval-requests.component';
import { AllOrdersComponent } from './users/all-orders/all-orders.component';
import { ViewUsersComponent } from './users/view-users/view-users.component';

export const routes: Routes = [
   
    {path:"register", component:RegisterComponent},
    {path:"login",component:LoginComponent},
    {path:"home", component:BookstoreComponent},
    {path:"my-orders", component:UserOrdersComponent},
    { path: 'maintenance', component: MaintenanceComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'return-book', component: ReturnBookComponent},
    { path: 'all-orders', component: AllOrdersComponent},
    { path: 'approval-requests', component: ApprovalRequestsComponent},
    { path: 'view-users', component: ViewUsersComponent},
    {path:"**", component:PageNotFoundComponent},
];
