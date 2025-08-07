import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { tap } from "rxjs";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  #httpClient = inject(HttpClient);
  #token = signal<null | string>(null);

  readonly token = this.#token.asReadonly();

  authenticateDummyUser() {
    return this.#httpClient.post<AuthResponse>(`https://dummyjson.com/auth/login`,
      {
        username: 'emilys',
        password: 'emilyspass'
      }
    ).pipe(
      tap(({ accessToken }) => this.#token.set(accessToken))
    )
  }
}