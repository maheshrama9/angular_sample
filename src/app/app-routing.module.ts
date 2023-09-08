import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component'
import { UserCreateComponent } from './user/user-create/user-create.component'
import { UserViewComponent } from './user/user-view/user-view.component'
import { UserUpdateComponent } from './user/user-update/user-update.component'
import { UserSearchComponent } from './user/user-search/user-search.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/users/mainPage' },
  { path: 'users/:page', component: UserListComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-update/:id', component: UserUpdateComponent },
  { path: 'user-view/:id', component: UserViewComponent },
  { path: 'user-search', component: UserSearchComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
