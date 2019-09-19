import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any = {};
  formLogin: FormGroup;
  formUser: FormGroup;
  formPwd: FormGroup;
  user: User;
  userFormView: boolean;
  recoverPasswordView: boolean;

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

    this.formPwd = fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  ngOnInit() {
  }

  loginPerfom() {
    this.messageService.clear();

    const username = this.formLogin.controls['username'].value;
    const password = this.formLogin.controls['password'].value;

    this.loginService.login(username, password).subscribe(
      result => {
        this.router.navigateByUrl('/app');
      },
      (err) => {
        console.log(err);
        if (err.status === 401) {
          this.messageService.add({ severity: 'error', summary: 'Access denied!', detail: '' });
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

  openRecoveryModal() {
    this.recoverPasswordView = true;
  }

  recover() {
    this.messageService.clear();

    this.user = Object.assign({}, this.formPwd.value);
    this.loginService.recover(this.user).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Email sent!' });
      },
      (err) => {
        if (err.status === 400) {
          this.messageService.add({ severity: 'warn', summary: 'Email not found!', detail: '' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: err.message });
        }
      });

    this.closeFormPwd();


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

  closeFormPwd() {
    this.recoverPasswordView = false;
    this.formPwd.reset();
  }


}
