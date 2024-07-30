import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { SharedModule } from '../shared/shared.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ReturnBookComponent } from './return-book/return-book.component';



@NgModule({
  declarations: [
    BookstoreComponent,
    MaintenanceComponent,
    ReturnBookComponent
  ],
  imports: [
    SharedModule
  ]
})
export class BooksModule { }
