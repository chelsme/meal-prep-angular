import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private router: Router) {}

  fetchUsers() {
    return this.http
      .get('http://localhost:3000/users')
      .subscribe((data: any[]) => {
        this.users.next(data.sort(() => Math.random() - 0.5));
      });
  }

  createUser(formData) {
    this.http
      .post('http://localhost:3000/users', {
        name: formData.name,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      })
      .subscribe((resp) => {
        this.fetchUsers();
        this.router.navigate(['/chefs']);
      });
  }
}
