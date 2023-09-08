import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { filter, map, tap, Observable } from 'rxjs';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  public users$!: Observable<User[]>;
  // public userList: User[] = [];

  private baseURL = "http://localhost:9090";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    this.users$ = this.http.get<User[]>(`${this.baseURL}/getAllUsers`)
      .pipe(
        map(users => users.map(user => ({ ...user, fullName: `${user.firstName} ${user.lastName}` })))
      );
    return this.users$;
    // return this.httpClient.get<User[]>(`${this.baseURL}/getAllUsers`);
  }

  createUser(user: User): Observable<Object>{
    return this.http.post(`${this.baseURL}/createUser`, user);
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(`${this.baseURL}/getUserById/${id}`);
  }

  updateUser(user: User): Observable<Object>{
    return this.http.put(`${this.baseURL}/editUser`, user);
  }

  deleteUser(id: number): Observable<Object>{
    return this.http.delete(`${this.baseURL}/deleteUser/${id}`);
  }
  searchUsers(firstName: string, lastName: string, phoneNumber: string, email: string): Observable<User[]> {
    // construct the search query with the provided search criteria
    let searchQuery = '';
    if (firstName) {
      searchQuery += `firstName=${firstName}&`;
    }
    if (lastName) {
      searchQuery += `lastName=${lastName}&`;
    }    
    if (email) {
      searchQuery += `email=${email}&`;
    }
    if (phoneNumber) {
      searchQuery += `phoneNumber=${phoneNumber}&`;
    }
    // remove the trailing '&' character
    searchQuery = searchQuery.slice(0, -1);
    
    // call the API with the constructed search query
    this.users$ = this.http.get<User[]>(`${this.baseURL}/searchUsers?${searchQuery}`);
    return this.users$;
  }
}
