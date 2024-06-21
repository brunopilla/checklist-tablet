import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PoNotificationService } from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private base64Credentials!: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private poNotificationService: PoNotificationService) {}

  login(username: string, password: string): Observable<any> {
    const url = `${environment.host2}api/btb/v1/companies`;
    this.base64Credentials = btoa(`${username}:${password}`);

    const headers: HttpHeaders = new HttpHeaders()
      .append('Authorization', 'Basic ' + this.base64Credentials)
      .append('Content-Type', 'application/json');

    return this.http.get(url, { headers: headers, responseType: 'json', withCredentials: true }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.poNotificationService.error('Usuário e/ou senha inválidos.');
        } else {
          this.poNotificationService.error('Erro ao autenticar no servidor. Tente novamente mais tarde.');
        }

        return throwError(() => error);
      }),
      tap((response) => {
        this.isAuthenticatedSubject.next(true);
        
      })
    );
  }

  logout():void{
    this.isAuthenticatedSubject.next(false);
    this.base64Credentials = '';
  }

  getBase64Credentials(): string {
    return this.base64Credentials;
  }

}

