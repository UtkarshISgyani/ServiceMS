import { Component } from '@angular/core';
import { Order } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss',
})
export class UserOrdersComponent {
  columnsForPendingServices: string[] = [
    'orderId',
    'serviceId',
    'serviceTitle',
    'orderDate',
    'fineToPay',
  ];
  columnsForCompletedServices: string[] = [
    'orderId',
    'serviceId',
    'serviceTitle',
    'orderDate',
    'completedDate',
    'finePaid',
  ];
  pendingServices: Order[] = [];
  completedServices: Order[] = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    let userId = this.apiService.getUserInfo()!.id;
    apiService.getOrdersOfUser(userId).subscribe({
      next: (res: Order[]) => {
        this.pendingServices = res.filter((o) => !o.completed);
        this.completedServices = res.filter((o) => o.completed);
      },
    });
  }

  getMoneyToPay(order: Order) {
    return this.apiService.getMoney(order);
  }
  
}
