import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ApprovalRequestsComponent } from './approval-requests/approval-requests.component';
import { ProfileComponent } from './profile/profile.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { SharedModule } from '../shared/shared.module';
import { BlockUsersComponent } from './block-users/block-users.component';



@NgModule({
  declarations: [
    AllOrdersComponent,
    ApprovalRequestsComponent,
    ProfileComponent,
    UserOrdersComponent,
    ViewUsersComponent,
    BlockUsersComponent
  ],
  imports: [
    SharedModule
  ]
})
export class UsersModule { }
