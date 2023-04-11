import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Propriedade } from '../models/propriedade';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PropriedadeService {
  propriedadeURL: string = '';
  constructor(
    private http: HttpClient
  ) {
    this.propriedadeURL = `${environment.apiURl}/propriedade`
  }
  listar() {
    return this.http.get<Array<Propriedade>>(this.propriedadeURL);
  }

  getById(id: number): Observable<Propriedade> {
    return this.http.get<Propriedade>(`${this.propriedadeURL}/${id}`);
  }

  getIncluir(request: Propriedade) {
    return this.http.post<Propriedade>(this.propriedadeURL, request);
  }

  getAlterar(id: Number | null, request: Propriedade) {
    return this.http.put<Propriedade>(`${this.propriedadeURL}/${id}`, request);
  }

  getExcluir(id: Number) {
    return this.http.delete<Propriedade>(`${this.propriedadeURL}/${id}`);
  }
}
