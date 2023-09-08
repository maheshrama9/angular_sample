import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  errorMessage!: string;
  id!: number;
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];

      this.userService.getUserById(this.id).subscribe({
        next: value => {
          console.log(value);
          this.user = value;
        },
        error: error => console.log('error'),
        complete: () => console.log('complete')
      });
    }
  
    onSubmit(){
      this.userService.updateUser(this.user).subscribe({
        next: value => {
          console.log(value);
          this.goToUserList();
        },
        error: error => {
          if (error instanceof HttpErrorResponse) {
            this.errorMessage = `Error: ${error.error}`;
          } else {
            this.errorMessage = 'Something went wrong!';
          }
        },
        complete: () => console.log('complete')
      });
    }
    
    goToUserList(){
      this.router.navigate(['/users/editPage']);
    }

  

}
