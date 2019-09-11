import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProfilesService } from 'src/app/core/services/profiles.service';
import { User } from 'src/app/core/models/User';
import { Profile } from 'src/app/core/models/Profile';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any = {};
  formLogin: FormGroup;
  formUser: FormGroup;
  user: User;
  userFormView: boolean;

  constructor(private loginService: LoginService,
    private messageService: MessageService,
    private router: Router,
    fb: FormBuilder) {

    this.formUser = fb.group({
      password: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.formLogin = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  ngOnInit() {
  }

  loginPerfom() {

    const username = this.formLogin.controls['username'].value;
    const password = this.formLogin.controls['password'].value;

    this.loginService.login(username, password).subscribe(
      result => {
        this.router.navigateByUrl('/main');
      },
      (err) => {
        console.log(err);
        if (err.status === 401) {
          this.messageService.add({ severity: 'error', summary: 'Access denied!', detail: 'Check the data you entered.' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Login internal error!  ', detail: err.message });
        }
      });

  }

  openCreateForm() {
    this.formUser.reset();
    this.userFormView = true;
    this.user = new User;
  }

  save() {
    this.user = Object.assign({}, this.formUser.value);

    this.loginService.register(this.user).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'User saved!' });
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error save user!', detail: err.message });
      });

    this.closeForm();

  }

  closeForm() {
    this.userFormView = false;
  }

}
