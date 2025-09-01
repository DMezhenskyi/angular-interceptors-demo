import { HttpClient, httpResource } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Auth } from '../core/auth/auth';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-users-list',
  imports: [MatButton],
  template: `
    @if (updateError()) {
      <div class="error">ERROR: Failed to update user</div>
    }
    @if (data.hasValue()) {
    <ul class="users-list">
      @for (user of data.value().users; track user.id) {
      <li>
        {{ user.firstName }} {{ user.lastName }}
        <button mat-stroked-button (click)="unenrollUser(user.id)">
          Unenroll
        </button>
      </li>
      }
    </ul>
    }
  `,
})
export class UsersList {

  #http = inject(HttpClient);

  protected updateError = signal(false);

  protected readonly data = httpResource<{ users: User[] }>(() => ({
    url: `https://dummyjson.com/auth/users?limit=5`
  }));

  unenrollUser(userId: number) {
    this.#http.patch<User>(
        `https://dummyjson.com/auth/users/${userId}`,
        { enrolled: false }
      )
      .subscribe({
        next: () => this.updatedSuccessfully(userId),
        error: () => this.updateError.set(true)
      });
  }
  
  private updatedSuccessfully(userId: number) {
    this.updateError.set(false);
    this.data.update((data) => ({
      users: data!.users.filter((user) => user.id !== userId),
    }));
  }
}
