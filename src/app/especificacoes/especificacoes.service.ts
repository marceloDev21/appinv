import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Especificacoes } from '../models/especificacoes';

@Injectable({
  providedIn: 'root'
})
export class EspecificacoesService {
  especificacoesURL: string = '';
  constructor(
    private http: HttpClient
  ) { 
    this.especificacoesURL = `${environment.apiURl}/especificacoes`
  }
  listar() {
    return this.http.get<Array<Especificacoes>>(this.especificacoesURL);
  }

  getById(id: number): Observable<Especificacoes> {
    return this.http.get<Especificacoes>(`${this.especificacoesURL}/${id}`);
  }

  getIncluir(request: Especificacoes) {
    return this.http.post<Especificacoes>(this.especificacoesURL, request);
  }

  getAlterar(id: Number | null, request: Especificacoes) {
    return this.http.put<Especificacoes>(`${this.especificacoesURL}/${id}`, request);
  }

  getExcluir(id: Number) {
    return this.http.delete<Especificacoes>(`${this.especificacoesURL}/${id}`);
  }
}
