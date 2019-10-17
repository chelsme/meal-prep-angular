import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user;
  imgUrl;
  selectedUserId;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.selectUser();
    this.setUserImg();
  }

  selectUser() {
    this.route.params.subscribe((params) => {
      this.selectedUserId = params.id;
    });
    this.user = this.userService.users.find((user) => {
      return user.id === parseInt(this.selectedUserId);
    });
    this.setUserImg();
  }

  setUserImg() {
    if (this.user.img === null) {
      this.imgUrl = `./assets/profile-pics/default-user.png`;
    } else {
      this.imgUrl = `./assets/profile-pics/${this.user.img}.png`;
    }
  }
}
