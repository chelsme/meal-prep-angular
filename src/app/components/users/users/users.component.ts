import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: any[];
  imgUrl;
  userSubscription;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userSubscription = this.userService.users.subscribe(
      (resp) => (this.users = resp)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
