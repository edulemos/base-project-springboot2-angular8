import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
import { AuthService } from 'src/app/core/guards/auth.service';
>>>>>>> 8af3bfa1d905a2dbc7d16b7fc242f262305b0978

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

<<<<<<< HEAD
  constructor(private router: Router) { }
=======
  constructor(private guard: AuthService) { }
>>>>>>> 8af3bfa1d905a2dbc7d16b7fc242f262305b0978

  items: MenuItem[];

  ngOnInit() {
    this.items =  new Array();

    const allMenus = [
      { label: 'Users', routerLink: 'users', expectedRole: 'ROLE_USERS_LIST' },
      { label: 'Profiles', routerLink: 'profiles', expectedRole: 'ROLE_PROFILES_LIST' },
    ];

    allMenus.forEach((menu) => {
      if (this.guard.isAuthorized(menu.expectedRole)) {
        const menuItem =  { label: menu.label, routerLink: menu.routerLink};
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
