import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  email!: string;
  
  
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.searchUsers(this.firstName, this.lastName, this.phoneNumber, this.email)
      .subscribe({
        next: value => {
          console.log(value);
          this.goToUserList('searchPage');
        },
        error: error => {
          console.error(error)
         
        },
        complete: () => console.log('complete')
      });
  }

  goToUserList(page:string){
    this.router.navigate(['/users',page]);
  }
}
