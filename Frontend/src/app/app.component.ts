import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ApiService } from './shared/services/api.service';
import { UsersModule } from './users/users.module';
import { ServiceModule } from './service/service.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    AuthModule,
    UsersModule,
    ServiceModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'UI';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
   let status = this.apiService.isLoggedIn() ? 'loggedIn' : 'loggedOff';
   this.apiService.userStatus.next(status);
  }
}