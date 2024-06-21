import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const base64Credentials = this.loginService.getBase64Credentials();

    // Clonar a requisição original e adicionar o cabeçalho de autorização
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    // Prosseguir com a requisição modificada
    return next.handle(modifiedRequest);
  }
}