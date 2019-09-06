import { Profile } from './../../core/models/Profile';
import { User } from './../../core/models/User';
import { UsersService } from './../../core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProfilesService } from 'src/app/core/services/profiles.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList: User[];
  allProfiles: Profile[];
  avaliablesProfiles: Profile[];
  userProfiles: Profile[];
  cols: any[];
  filterValue: string;
  userFormView: boolean;
  formUser: FormGroup;
  user: User;

  constructor(private service: UsersService,
    private profileService: ProfilesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    fb: FormBuilder
  ) {

    this.formUser = fb.group({
      id: [''],
      password: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.list();
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' }
    ];
  }

  list() {
    const val = this.filterValue;
    this.service.list(val).subscribe(
      data => {
        this.usersList = data;
      });
  }

  save() {
    this.user = Object.assign({}, this.formUser.value);
    this.user.profiles = this.userProfiles;

    this.service.save(this.user).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'User saved!' });
        this.list();
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error save user!', detail: err.message });
      });

    this.closeForm();
  }

  delete(user: User) {
    this.confirmationService.confirm({
      message: `Do you want to delete this user?&nbsp;<b>${user.name}</b> `,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.delete(user).subscribe(
          (response) => {
            this.messageService.add({ severity: 'info', summary: '', detail: 'User deleted!' });
            this.list();
          },
          (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error delete user', detail: err.message });
          });
      }
    });
  }

  openCreateForm() {
    this.formUser.reset();
    this.profileService.listAll().subscribe(data => {
      this.allProfiles = data;
      this.avaliablesProfiles = this.allProfiles;
      this.userProfiles = [];
    });
    this.userFormView = true;
    this.user = new User;
  }

  openEditForm(user: User) {
    this.formUser.setValue({
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      password: ' '
    });

    this.profileService.listAll().subscribe(data => {
      this.allProfiles = data;
      this.userProfiles = user.profiles;
      this.avaliablesProfiles = this.allProfiles;
      this.userProfiles.forEach(e1 => {
        this.avaliablesProfiles.forEach(function (e2, index, object) {
          if (e1.name === e2.name) {
            object.splice(index, 1);
          }
        });
      });
    });
    this.userFormView = true;
    this.user = user;
  }

  

  closeForm() {
    this.userFormView = false;
  }

  clearFilter() {
    this.filterValue = '';
    this.list();
  }



}
