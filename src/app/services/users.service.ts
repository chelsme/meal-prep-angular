import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  fetchUsers() {
    return this.http.get('http://localhost:3000/users');
  }

  createUser() {
    console.log('here@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    this.http
      .post(
        'http://localhost:3000/users',
        {
          name: 'Steve',
          password: 'cat',
          password_confirmation: 'cat'
        },
        httpOptions
      )
      .subscribe((resp) => console.log(resp));
  }
}
