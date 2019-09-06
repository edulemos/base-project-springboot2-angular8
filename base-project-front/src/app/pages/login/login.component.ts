import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any = {};
  formLogin: FormGroup;

  constructor(private loginService: LoginService,
    private messageService: MessageService,
    private router: Router,
    fb: FormBuilder) {

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


}
