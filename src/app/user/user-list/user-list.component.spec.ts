import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientModule here
      declarations: [UserListComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should call getAllUsers', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    
    let service = fixture.debugElement.injector.get(UserService);
    spyOn(service,"getUsers").and.callFake(() => {
      return of([{
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      }]);
    })
    app.getAllUsers()
    expect(app.userList).toEqual([{
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    }]);

  })
});
