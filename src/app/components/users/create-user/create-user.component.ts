import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  createUserControl = new FormGroup({
    name: new FormControl('', [Validators.min(3), Validators.required]),
    password: new FormControl('', [Validators.min(3), Validators.required]),
    confirmPassword: new FormControl('', [
      Validators.min(3),
      Validators.required
    ])
  });

  constructor(private userService: UsersService) {}

  ngOnInit() {}

  formValidation() {
    const nameControl = this.createUserControl.get('name');
    const passwordControl = this.createUserControl.get('password');
    const confirmPasswordControl = this.createUserControl.get(
      'confirmPassword'
    );
    return (
      nameControl.valid && passwordControl.valid && confirmPasswordControl.valid
    );
  }

  confirmPassword() {
    const passwordControl = this.createUserControl.get('password');
    const confirmPasswordControl = this.createUserControl.get(
      'confirmPassword'
    );
    return passwordControl.value === confirmPasswordControl.value;
  }

  createUser() {
    if (this.confirmPassword() !== true) {
      alert('Passwords must match');
    } else {
      alert('User successfully created!');
      this.userService.createUser();
    }
  }
}
