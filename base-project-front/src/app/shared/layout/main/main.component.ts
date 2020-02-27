import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/guards/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private guard: AuthService) { }

  items: MenuItem[];

  ngOnInit() {
    this.items = new Array();

    const allMenus = [
      { label: 'Users', routerLink: 'users', expectedRole: 'ROLE_USERS_LIST' },
      { label: 'Profiles', routerLink: 'profiles', expectedRole: 'ROLE_PROFILES_LIST' },
      { label: 'Upload', routerLink: 'upload', expectedRole: 'ROLE_UPLOAD' },
    ];

    allMenus.forEach((menu) => {
      if (this.guard.isAuthorized(menu.expectedRole)) {
        const menuItem = { label: menu.label, routerLink: menu.routerLink };
        this.items.push(menuItem);
      }
    });

  }

  logout() {
    window.location.href = '/';
    localStorage.clear();
  }

  account() {
    this.router.navigateByUrl('/app/account');
  }

}
