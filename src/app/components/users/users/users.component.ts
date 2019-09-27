import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[];

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.fetchUsers().subscribe((data: any[]) => {
      this.users = data.sort(() => Math.random() - 0.5);
    });
  }
}
