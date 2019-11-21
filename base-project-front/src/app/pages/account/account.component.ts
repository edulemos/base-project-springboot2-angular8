import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/guards/auth.service';
import { User } from '../../core/models/User';
import { UsersService } from 'src/app/core/services/users.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';
import { Password } from '../../core/models/Password';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User;
  password: Password;
  formUser: FormGroup;
  formPwd: FormGroup;

  constructor(private authService: AuthService,
    private userService: UsersService,
    private messageService: MessageService,
    fb: FormBuilder) {

    this.formUser = fb.group({
      id: [''],
      password: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.formPwd = fb.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });

  }

  ngOnInit() {
    this.user = this.authService.getUserLogged();

    this.formUser.setValue({
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      username: this.user.username,
      password: ' '
    });
  }

  save() {

    this.user = Object.assign({}, this.formUser.value);

    this.userService.saveAccount(this.user).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'User saved!' });
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error save user!', detail: err.message });
      });

    localStorage.setItem('name', this.user.name);
    localStorage.setItem('email', this.user.email);

  }

  savepwd() {

    this.password = Object.assign({}, this.formPwd.value);

    this.userService.savePassword(this.user, this.password).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Password changed!' });
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error change password!', detail: err.message });
      });

  }

}
