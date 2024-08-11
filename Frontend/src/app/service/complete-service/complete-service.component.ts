import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';
import { Order } from '../../models/models';

@Component({
  selector: 'complete-service',
  templateUrl: './complete-service.component.html',
  styleUrl: './complete-service.component.scss',
})
export class CompleteServiceComponent {
  completeForm: FormGroup;
  payment: number | null = null;

  constructor(
    fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.completeForm = fb.group({
      userId: fb.control(null, [Validators.required]),
      serviceId: fb.control(null, [Validators.required]),
    });
  }

  getMoney() {
    let userId = this.completeForm.get('userId')?.value;
    let serviceId = this.completeForm.get('serviceId')?.value;

    this.apiService.getOrdersOfUser(userId).subscribe({
      next: (res: Order[]) => {
        if (res.some((o) => !o.completed && o.serviceId == serviceId)) {
          let order: Order = res.filter((o) => o.serviceId == serviceId)[0];
          this.payment = this.apiService.getMoney(order);
        } else {
          this.snackBar.open(`User doesn't have Service Request with ID: ${serviceId}`, 'OK');
        }
      },
    });
  }

  completeService() {
    let userId = this.completeForm.get('userId')?.value;
    let serviceId = this.completeForm.get('serviceId')?.value;

    this.apiService.completeService(userId, serviceId, this.payment!).subscribe({
      next: (res) => {
        if (res === 'returned')
          this.snackBar.open('Service has been Completed!', 'OK');
        else this.snackBar.open('Service has not Completed!', 'OK');
      },
    });
  }
}