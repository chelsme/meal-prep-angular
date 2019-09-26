import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users = {};

  constructor(private http: HttpClient) {}

  fetchUsers() {
    this.http.get('http://localhost:3000/users').subscribe((response) => {
      this.users = response;
      return this.users;
    });
  }
}
