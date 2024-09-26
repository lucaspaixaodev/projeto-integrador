import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUserSubject: BehaviorSubject<User | null>;

  currentUser$: Observable<User | null>;
  isAdmin$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this._currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
    this.currentUser$ = this._currentUserSubject.asObservable();
    this.isAdmin$ = this.currentUser$.pipe(
      tap(user => console.log('User in isAdmin$:', user)),
      map(user => user?.isAdmin ?? false)
    );
  }

  private getUserFromLocalStorage(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', { email, password }).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this._currentUserSubject.next(null);
  }

  register(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/register', { email, password }).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._currentUserSubject.next(user);
      })
    );
  }

  getCurrentUser(): User | null {
    return this._currentUserSubject.value;
  }
}
