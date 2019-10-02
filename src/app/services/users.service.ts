import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}

  fetchUsers() {
    return this.http.get('http://localhost:3000/users');
  }

  createUser(formData) {
    this.http
      .post('http://localhost:3000/users', {
        name: formData.name,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      })
      .subscribe((resp) => {
        console.log(resp);
        this.router.navigate(['/chefs']);
      });
  }
}
