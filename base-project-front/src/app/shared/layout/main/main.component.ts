import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Users', routerLink: 'users' },
      { label: 'Profiles', routerLink: 'profiles' },
    ];
  }

  logout() {
    window.location.href = '/';
    localStorage.clear();
  }

  account() {
    this.router.navigateByUrl('/app/account');
  }

}
