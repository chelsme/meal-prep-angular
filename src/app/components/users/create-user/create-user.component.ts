import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.createUserForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      confirmPassword: new FormControl(null, Validators.required)
    });
  }

  formValidation() {
    const name = this.createUserForm.get('name');
    const password = this.createUserForm.get('password');
    const confirmation = this.createUserForm.get('confirmPassword');
    return (
      name.valid &&
      password.valid &&
      this.confirmPassword(password, confirmation)
    );
  }

  confirmPassword(p, c) {
    return p.value === c.value;
    //  && p.touched && p.dirty && c.touched && c.dirty;
  }

  onCreateUser() {
    this.userService.createUser(this.createUserForm.value);
  }
}
