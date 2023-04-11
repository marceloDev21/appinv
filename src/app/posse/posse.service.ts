import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Posse } from '../models/posse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PosseService {
  posseURL: string = '';
  constructor(
    private http: HttpClient
  ) {
    this.posseURL = `${environment.apiURl}/posse`
  }

  listar() {
    return this.http.get<Array<Posse>>(this.posseURL);
  }

  getIncluir(request: Posse) {
    return this.http.post<Posse>(this.posseURL, request);
  }

  getById(id: number): Observable<Posse> {
    return this.http.get<Posse>(`${this.posseURL}/${id}`);
  }

  getAlterar(id: Number | null, request: Posse) {
    return this.http.put<Posse>(`${this.posseURL}/${id}`, request);
  }

  getExcluir(id: Number) {
    return this.http.delete<Posse>(`${this.posseURL}/${id}`);
  }

}
