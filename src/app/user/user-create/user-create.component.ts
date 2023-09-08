import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  userForm!: FormGroup;
  errorMessage!: string;
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };

  constructor(private userService: UserService,
    private router: Router,private fb: FormBuilder) { 
      
    }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  


  saveUser(){
    this.userService.createUser(this.user).subscribe({
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
    this.router.navigate(['/users/addPage']);
  }
  
  onSubmit(){
      this.user = {
        id: 0,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        phoneNumber: this.userForm.value.phoneNumber,
    };
    console.log(this.user);
    this.saveUser();
  }
}
