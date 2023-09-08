import { Component, OnInit } from '@angular/core';
import { User } from '../user'; 
import { UserService } from '../../services/user.service'
import { ConfirmationDialogComponent } from '../../core/confirmation-dialog/confirmation-dialog.component'
import { Router ,ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[] = [];

  constructor(private userService: UserService,
    private router: Router,public dialog: MatDialog,private route: ActivatedRoute){}

  ngOnInit(): void {
    const page = this.route.snapshot.paramMap.get('page');
    console.log("user-list:"+page);
    if (page === 'mainPage' || page === 'addPage' ||  page === 'editPage') {
      this.getAllUsers()
    } else if (page === 'searchPage') {
      this.userService.users$.subscribe(users => {
        this.userList = users;
      });
      
    }
    
    
  }
  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this user?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log('Delete item');
        this.deleteUser(id);
      } else {
        console.log('Cancel delete');
      }
    });
  }
  getAllUsers(){
    this.userService.getUsers().subscribe({
      next: value => {
        this.userList = value;
      },
      error: error => console.error(error),
      complete: () => console.log('complete')
    });
  }

  
  userDetails(id: number){
    this.router.navigate(['user-view', id]);
  }

  updateUser(id: number){
    this.router.navigate(['user-update', id]);
  }

  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe( {
      next: value => {
        console.log(value);
        this.getAllUsers();
      },
      error: error => console.error(error),
      complete: () => console.log('complete')
    })
  }

  
}
