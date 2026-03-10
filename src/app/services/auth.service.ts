import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly loggedIn$ = new BehaviorSubject<boolean>(false);

  readonly isLoggedIn$ = this.loggedIn$.asObservable();

  login(): void {
    this.loggedIn$.next(true);
  }

  logout(): void {
    this.loggedIn$.next(false);
  }

  isAuthenticated(): boolean {
    return this.loggedIn$.value;
  }
}
