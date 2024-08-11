export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    password: string;
    userType: UserType;
    accountStatus: AccountStatus;
    createdOn: string;
  }
  
  export enum AccountStatus {
    UNAPROOVED,
    ACTIVE,
    BLOCKED,
  }
  
  export enum UserType {
    ADMIN,
    CUSTOMER,
  }
  
  export interface ServiceCategory {
    id: number;
    category: string;
    subCategory: string;
  }
  
  export interface Service {
    id: number;
    title: string;
    serviceType: string;
    price: number;
    ordered: boolean;
    serviceCategoryId: number;
    serviceCategory: ServiceCategory;
  }
  
  export interface ServicesByCategory {
    serviceCategoryId: number;
    category: string;
    subCategory: string;
    services: Service[];
  }
  
  export interface Order {
    id: number;
    userId: number;
    userName: string | null;
    serviceId: number;
    serviceTitle: string;
    orderDate: string;
    completed: boolean;
    completeDate: string | null;
    payment: number;
  }