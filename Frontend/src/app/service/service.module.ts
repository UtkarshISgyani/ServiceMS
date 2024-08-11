import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceStoreComponent } from './service-store/service-store.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { CompleteServiceComponent } from './complete-service/complete-service.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ServiceStoreComponent,
    MaintenanceComponent,
    CompleteServiceComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ServiceModule { }
