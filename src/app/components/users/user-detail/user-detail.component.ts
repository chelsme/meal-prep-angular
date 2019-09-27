import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() user = { name };
  imgUrl;
  selectedUserId;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.user.img !== '') {
      this.imgUrl = `./assets/profile-pics/${this.user.img}.png`;
    } else {
      this.imgUrl = `./assets/profile-pics/default-user.png`;
    }
    this.selectUser();
  }

  selectUser() {
    if (this.user.name === '') {
      this.route.params.subscribe((params) => {
        this.selectedUserId = params.id;
      });
      this.userService.fetchUsers().subscribe((data: any[]) => {
        this.user = data.find((user) => {
          return user.id === parseInt(this.selectedUserId);
        });
        this.imgUrl = `./assets/profile-pics/${this.user.name}.png`;
      });
    }
  }
}
