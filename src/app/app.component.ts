import { Component, OnInit } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showMenu = false;

  readonly menus: Array<PoMenuItem> = [
    { label: 'Início', link: '/home', icon: 'po-icon po-icon-home' },
    { label: 'Checklist de Rotas', link: '/checklist', icon: 'po-icon po-icon-pin' },
    { label: 'Diário de Bordo', link: '/diario', icon: 'po-icon po-icon-clipboard' },
    { label: 'Anexar Arquivo', link: '/upload', icon: 'po-icon po-icon-upload' },
    { label: 'Ajuda', link: '/help', icon: 'po-icon po-icon-help' },
    { label: 'Sair', link: '/exit', icon: 'po-icon po-icon-exit' }
  ];
  src: string|undefined;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.isAuthenticated$.subscribe(isAuthenticated => {
      this.showMenu = isAuthenticated;
    });
  }
}