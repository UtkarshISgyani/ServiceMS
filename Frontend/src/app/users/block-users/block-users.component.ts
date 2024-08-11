import { Component } from '@angular/core';
import { FormBuilder,FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'block-users',
  templateUrl: './block-users.component.html',
  styleUrl: './block-users.component.scss'
})
export class BlockUsersComponent {
  blockUser: FormControl;

  constructor( fb: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar) {
    this.blockUser = fb.control('', [Validators.required]);
  }
  blockUsers() {
    let id = this.blockUser.value;
    this.apiService.blockUsers(id).subscribe({
      next: (res) => {
        if (res === 'blocked')
          this.snackBar.open('User has been Blocked!', 'OK');
      },
      error: (err) => this.snackBar.open('User does not Exist!', 'OK'),
    });
  }

  
  

}
