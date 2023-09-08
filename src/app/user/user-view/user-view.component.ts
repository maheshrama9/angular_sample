import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
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
        error: error => console.error(error),
        complete: () => console.log('complete')
    });
  }


}
