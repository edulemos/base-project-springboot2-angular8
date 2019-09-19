import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  uuid: string;
  showForm: boolean;
  formRecover: FormGroup;

  ngOnInit() {
  }

  constructor(private loginService: LoginService,
    private messageService: MessageService, route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder) {

    this.formRecover = fb.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    }, { validator: this.checkPasswords });

    route.queryParams.subscribe((params: any) => {
      if (params.u) {
        this.uuid = params.u;
        this.loginService.recoverCheck(this.uuid).subscribe(
          data => {
            this.showForm = true;
          },
          (err) => {
            if (err.status === 404) {
              this.messageService.add({ severity: 'warn', summary: 'Recover link invalid!', detail: '' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Recover error!', detail: err.message });
            }
          });
      }
    });
  }



  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const passwordConfirm = group.get('passwordConfirm').value;
    return pass === passwordConfirm ? null : { notSame: true };
  }


  recoverSave() {

    const password = this.formRecover.controls['password'].value;

    this.loginService.recoverSave(this.uuid, password).subscribe(
      data => {
        this.messageService.add({ severity: 'info', summary: 'Password changed!', detail: '' });
        this.showForm = false;
      },
      (err) => {
          this.messageService.add({ severity: 'error', summary: 'Password Recover error!', detail: err.message });
      });



  }

}
