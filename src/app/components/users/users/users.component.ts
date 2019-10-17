import { Component, OnInit, DoCheck } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, DoCheck {
  users: any[];
  imgUrl;

  constructor(private userService: UsersService) {}

  ngOnInit() {}

  ngDoCheck() {
    if (this.users === undefined) {
      this.userService.fetchUsers();
      this.users = this.userService.users;
    }

    if (this.users && this.users.length !== this.userService.users.length) {
      this.users = this.userService.users;
    }
  }
}
