import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, map } from 'rxjs';
import { Service, ServiceCategory, Order, User, UserType } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'https://localhost:7051/api/Service/';
  userStatus: Subject<string> = new Subject();
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  register(user: any) {
    return this.http.post(this.baseUrl + 'Register', user, {
      responseType: 'text',
    });
  }
  login(info: any) {
    let params = new HttpParams()
      .append('email', info.email)
      .append('password', info.password);

    return this.http.get(this.baseUrl + 'Login', {
      params: params,
      responseType: 'text',
    });
  }
  isLoggedIn(): boolean {
    if (
      localStorage.getItem('access_token') != null &&
      !this.jwt.isTokenExpired()
    )
      return true;
    return false;
  }
  getUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    var decodedToken = this.jwt.decodeToken();
    var user: User = {
      id: decodedToken.id,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      email: decodedToken.email,
      mobileNumber: decodedToken.mobileNumber,
      userType: UserType[decodedToken.userType as keyof typeof UserType],
      accountStatus: decodedToken.accountStatus,
      createdOn: decodedToken.createdOn,
      password: '',
    };
    return user;
  }

  logOut() {
    localStorage.removeItem('access_token');
    this.userStatus.next('loggedOff');
  }

  getServices() {
    return this.http.get<Service[]>(this.baseUrl + 'GetServices');
  }

  orderService(service: Service) {
    let userId = this.getUserInfo()!.id;
    let params = new HttpParams()
      .append('userId', userId)
      .append('serviceId', service.id);

    return this.http.post(this.baseUrl + 'OrderService', null, {
      params: params,
      responseType: 'text',
    });
  }

  getOrdersOfUser(userId: number) {
    let params = new HttpParams().append('userId', userId);
    return this.http
      .get<any>(this.baseUrl + 'GetOrdersOfUser', {
        params: params,
      })
      .pipe(
        map((orders) => {
          let newOrders = orders.map((order: any) => {
            let newOrder: Order = {
              id: order.id,
              userId: order.userId,
              userName: order.user.firstName + ' ' + order.user.lastName,
              serviceId: order.serviceId,
              serviceTitle: order.service.title,
              orderDate: order.orderDate,
              completed: order.completed,
              completeDate: order.completeDate,
              payment: order.payment,
            };
            return newOrder;
          });
          return newOrders;
        })
      );
  }
  getMoney(order: Order) {
   /* let today = new Date();
    let orderDate = new Date(Date.parse(order.orderDate));
    orderDate.setDate(orderDate.getDate() + 10);
    if (orderDate.getTime() < today.getTime()) {
      var diff = today.getTime() - orderDate.getTime();
      let days = Math.floor(diff / (1000 * 86400));*/
      let money = Math.floor(order.payment);
      return  money;  
  }

  addNewCategory(category: ServiceCategory) {
    return this.http.post(this.baseUrl + 'AddCategory', category, {
      responseType: 'text',
    });
  }

  getCategories() {
    return this.http.get<ServiceCategory[]>(this.baseUrl + 'GetCategories');
  }

  addService(service: Service) {
    return this.http.post(this.baseUrl + 'AddService', service, {
      responseType: 'text',
    });
  }

  deleteService(id: number) {
    return this.http.delete(this.baseUrl + 'DeleteService', {
      params: new HttpParams().append('id', id),
      responseType: 'text',
    });
  }

  completeService(userId: string, serviceId: string, payment: number) {
    return this.http.get(this.baseUrl + 'CompleteService', {
      params: new HttpParams()
        .append('userId', userId)
        .append('serviceId', serviceId)
        .append('payment', payment),
      responseType: 'text',
    });
  }
  getUsers() {
    return this.http.get<User[]>(this.baseUrl + 'GetUsers');
  }

  approveRequest(userId: number) {
    return this.http.get(this.baseUrl + 'ApproveRequest', {
      params: new HttpParams().append('userId', userId),
      responseType: 'text',
    });
  }

  getOrders() {
    return this.http.get<any>(this.baseUrl + 'GetOrders').pipe(
      map((orders) => {
        let newOrders = orders.map((order: any) => {
          let newOrder: Order = {
            id: order.id,
            userId: order.userId,
            userName: order.user.firstName + ' ' + order.user.lastName,
            serviceId: order.serviceId,
            serviceTitle: order.service.title,
            orderDate: order.orderDate,
            completed: order.completed,
            completeDate: order.completeDate,
            payment: order.payment,
          };
          return newOrder;
        });
        return newOrders;
      })
    );
  }

  sendEmail() {
    return this.http.get(this.baseUrl + 'SendEmailForPendingServices', {
      responseType: 'text',
    });
  }

    blockUsers(userId: number) {
      return this.http.get(this.baseUrl + 'BlockUsers', {
        params: new HttpParams().append('userId', userId),
        responseType: 'text',
      });
    }
  

  unblock(userId: number) {
    return this.http.get(this.baseUrl + "Unblock", {
      params: new HttpParams().append("userId", userId),
      responseType: "text",
    });
  }

}
