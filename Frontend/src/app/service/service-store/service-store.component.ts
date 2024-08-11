import { Component } from '@angular/core';
import { Service, ServicesByCategory} from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'service-store',
  templateUrl: './service-store.component.html',
  styleUrl: './service-store.component.scss',
})
export class ServiceStoreComponent {
  displayedColumns: string[] = [
    'id',
    'title',
    'serviceType',
    'price',
    'available',
    'order',
  ];
  services: Service[] = [];
  servicesToDisplay: ServicesByCategory[] = [
    {
      serviceCategoryId: 1,
      category: 'C',
      subCategory: 'S',
      services: [
        {
          id: 1,
          title: 'T',
          serviceType: 'A',
          price: 100,
          ordered: false,
          serviceCategoryId: 1,
          serviceCategory: { id: 1, category: '', subCategory: '' },
        },
      ],
    },
  ];
  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    apiService.getServices().subscribe({
      next: (res: Service[]) => {
        this.services = [];
        res.forEach((b) => this.services.push(b));
       

        this.updateList();
      },
    });
  }
  updateList() {
    this.servicesToDisplay = [];
    for (let service of this.services) {
      let categoryExists = false;
      let categoryService: ServicesByCategory | null;
      for (let serviceToDisplay of this.servicesToDisplay) {
        if (serviceToDisplay.serviceCategoryId == service.serviceCategoryId) {
          categoryExists = true;
          categoryService = serviceToDisplay;
        }
      }
      if (categoryExists) {
        categoryService!.services.push(service);
      } else {
        this.servicesToDisplay.push({
          serviceCategoryId: service.serviceCategoryId,
          category: service.serviceCategory.category,
          subCategory: service.serviceCategory.subCategory,
          services: [service],
        });
      }
    }
  }
  searchServices(value: string) {
    this.updateList();
    value = value.toLowerCase();
    this.servicesToDisplay = this.servicesToDisplay.filter((serviceToDisplay) => {
      serviceToDisplay.services = serviceToDisplay.services.filter((service) => {
        return service.title.toLowerCase().includes(value);
      });
      return serviceToDisplay.services.length > 0;
    });
  }

  getServiceCount() {
    let count = 0;
    this.servicesToDisplay.forEach((b) => (count += b.services.length));
    return count;
  }

  orderService(service: Service) {
    this.apiService.orderService(service).subscribe({
      next: (res) => {
        if (res === 'ordered') {
          service.ordered = true;
          let today = new Date();
          let returnDate = new Date();
          returnDate.setDate(today.getDate() + 10);

          this.snackBar.open(
            service.title +
              ' has been ordered! You service will be done before ' +
              returnDate.toDateString(),
            'OK'
          );
        } else {
          this.snackBar.open(
            'You cannot order anymore',
            'OK'
          );
        }
      },
    });
  }
    
}
