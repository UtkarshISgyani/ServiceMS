import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Service, ServiceCategory } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';

export interface CategoryOption {
  displayValue: string;
  value: number;
}

@Component({
  selector: 'maintenance',
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss',
})
export class MaintenanceComponent {
  newCategory: FormGroup;
  newService: FormGroup;
  deleteService: FormControl;
  categoryOptions: CategoryOption[] = [];

  constructor(
    fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.newCategory = fb.group({
      category: fb.control('', [Validators.required]),
      subCategory: fb.control('', [Validators.required]),
    });

    this.newService = fb.group({
      title: fb.control('', [Validators.required]),
      serviceType: fb.control('', [Validators.required]),
      price: fb.control(0, [Validators.required]),
      category: fb.control(-1, [Validators.required]),
    });

    apiService.getCategories().subscribe({
      next: (res: ServiceCategory[]) => {
        res.forEach((c) => {
          this.categoryOptions.push({
            value: c.id,
            displayValue: `${c.category} / ${c.subCategory}`,
          });
        });
      },
    });

    this.deleteService = fb.control('', [Validators.required]);
  }
  addNewCategory() {
    let serviceCategory: ServiceCategory = {
      id: 0,
      category: this.newCategory.get('category')?.value,
      subCategory: this.newCategory.get('subCategory')?.value,
    };
    this.apiService.addNewCategory(serviceCategory).subscribe({
      next: (res) => {
        if (res === 'cannot insert') {
          this.snackBar.open('Already Exists!', 'OK');
        } else {
          this.snackBar.open('INSERTED', 'OK');
        }
      },
    });
  }
  
  addNewService() {
    let service: Service = {
      id: 0,
      title: this.newService.get('title')?.value,
      serviceType: this.newService.get('serviceType')?.value,
      serviceCategoryId: this.newService.get('category')?.value,
      price: this.newService.get('price')?.value,
      serviceCategory: { id: 0, category: '', subCategory: '' },
      ordered: false,
    };

    this.apiService.addService(service).subscribe({
      next: (res) => {
        if (res === 'inserted') this.snackBar.open('service Added', 'OK');
      },
    });
  }

  deleteExistingService() {
    let id = this.deleteService.value;
    this.apiService.deleteService(id).subscribe({
      next: (res) => {
        if (res === 'deleted')
          this.snackBar.open('Service has been Deleted!', 'OK');
      },
      error: (err) => this.snackBar.open('Service does not Exist!', 'OK'),
    });
  }
  
}
