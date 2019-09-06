import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Users', routerLink: 'users'},
      { label: 'Profiles', routerLink: 'profiles'},
    ];
  }

  logout() {
    window.location.href = '/';
    localStorage.clear();
  }

}
