import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Agendamento } from './agendamento.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {
  private baseUrl = `${environment.host}agendamento`; 

  constructor(private http: HttpClient) { }

 getAgendamentosPorData(data: String): Observable<Agendamento[]> {
    const url = `${this.baseUrl}?data=${data}`;
    return this.http.get<Agendamento[]>(url).pipe(
      map((response: any) => response.items)
      );
  }
}


