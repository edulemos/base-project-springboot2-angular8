import { Profile } from './../../core/models/Profile';
import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/core/services/profiles.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Role } from 'src/app/core/models/Role';
import { RolesService } from 'src/app/core/services/roles.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  profileList: Profile[];
  avaliablesRoles: Role[];
  profileRoles: Role[];
  cols: any[];
  filterValue: string;
  profileFormView: boolean;
  formProfile: FormGroup;
  profile: Profile;

  constructor(private service: ProfilesService,
    private roleService: RolesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    fb: FormBuilder
  ) {
    this.formProfile = fb.group({
      id: [''],
      name: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.list();
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'roles', header: 'Roles' }
    ];
  }

  list() {
    const val = this.filterValue;
    this.service.list(val).subscribe(
      data => {
        this.profileList = data;
      });
  }

  save() {
    this.profile = Object.assign({}, this.formProfile.value);
    this.profile.roles = this.profileRoles;

    this.service.save(this.profile).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Profile saved!' });
        this.list();
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error save profile!', detail: err.message });
      });

    this.closeForm();
  }

  delete(profile: Profile) {
    this.confirmationService.confirm({
      message: `Do you want to delete this profile?&nbsp;<b>${profile.name}</b> `,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {

        this.service.delete(profile).subscribe(
          (response) => {
            this.messageService.add({ severity: 'info', summary: '', detail: 'Profile deleted!' });
            this.list();
          },
          (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error delete profile', detail: err.message });
          });

      }
    });
  }

  openCreateForm() {
    this.formProfile.reset();
    this.roleService.listAll().subscribe(data => {
      this.avaliablesRoles = data;
      this.profileRoles = [];
    });
    this.profileFormView = true;
    this.profile = new Profile;

  }

  openEditForm(profile: Profile) {
    this.formProfile.setValue({
      id: profile.id,
      name: profile.name
    });

    this.roleService.listAll().subscribe(data => {
      this.profileRoles = profile.roles;
      this.avaliablesRoles = data;
      this.profileRoles.forEach(e1 => {
        this.avaliablesRoles.forEach(function (e2, index, object) {
          if (e1.name === e2.name) {
            object.splice(index, 1);
          }
        });
      });
    });
    this.profileFormView = true;
    this.profile = profile;

  }

  closeForm() {
    this.profileFormView = false;
    this.list();
  }

  clearFilter() {
    this.filterValue = '';
    this.list();
  }

}
