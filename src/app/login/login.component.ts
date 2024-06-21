import { Component } from '@angular/core';
import { PoPageLogin, PoPageLoginLiterals } from '@po-ui/ng-templates';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public logo = 'assets/logo.png';
  public secondaryLogo = 'assets/secondaryLogo.png';
  public rideRememberUser = true;
  public languages = [];
  public passwordErrors: Array<string> = [];
  public loginErrors: Array<string> = [];
  
  public customLiterals: PoPageLoginLiterals = {
    welcome: 'Boas-vindas',
    loginHint: 'Informe suas credenciais Datasul',
    loginLabel: 'Usuário',
    loginPlaceholder: 'Insira seu usuário',
    passwordLabel: 'Senha',
    passwordPlaceholder: 'Insira sua senha',
    submitLabel: 'Entrar',
    submittedLabel: 'Carregando...'
  };
  constructor(private router: Router, private loginService: LoginService) {}

  public login(formData: PoPageLogin): void {
    const username = formData.login;
    const password = formData.password;

    this.loginService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}


