import { Component } from '@angular/core';
import { Order } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponent {
  columnsForPendingServices: string[] = [
    'orderId',
    'userIdForOrder',
    'userNameForOrder',
    'serviceId',
    'orderDate',
    'fineToPay',
  ];

  columnsForCompletedServices: string[] = [
    'orderId',
    'userIdForOrder',
    'userNameForOrder',
    'serviceId',
    'orderDate',
    'completedDate',
    'finePaid',
  ];
  showProgressBar: boolean = false;
  ordersWithPendingServices: Order[] = [];
  ordersWithCompletedServices: Order[] = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    apiService.getOrders().subscribe({
      next: (res: Order[]) => {
        this.ordersWithPendingServices = res.filter((o) => !o.completed);
        this.ordersWithCompletedServices = res.filter((o) => o.completed);
      },
      error: (err) => {
        this.snackBar.open('No Orders Found', 'OK');
      },
    });
  }

  sendEmail() {
    this.showProgressBar = true;
    this.apiService.sendEmail().subscribe({
      next: (res) => {
        if (res === 'sent') {
          this.snackBar.open(
            'Emails have been Sent to respected Customers!',
            'OK'
          );
          this.showProgressBar = false;
        } else {
          this.snackBar.open('Emails have not been sent!', 'OK');
          this.showProgressBar = false;
        }
      },
    });
  }
}
