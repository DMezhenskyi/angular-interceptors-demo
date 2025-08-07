import { Component } from '@angular/core';
import { UsersList } from './users-list';

@Component({
  selector: 'app-admin-page',
  imports: [UsersList],
  template: `
    <h1>Admin</h1>
    <p style="color: orange">*HTTP requests here require auth token</p>
    <hr />
    <h3>Enrolled Users</h3>
    <app-users-list />
  `
})
export class AdminPage {

}
