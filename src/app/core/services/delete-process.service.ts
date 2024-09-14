import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/table-data.model';
import { NumberInput } from '@angular/cdk/coercion';

@Injectable({
  providedIn: 'root'
})
export class DeleteProcessService {
  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getParams(id: number, userAccountId: number): HttpParams{
    return new HttpParams()
    .set('id', id)
    .set('UserAccountId', userAccountId)
  }

  deleteItem(id: number, userAccountId: number, page: string){
    return this.http.get(`${this.url}/${page}/Delete`, {params: this.getParams(id, userAccountId)});
  }
}
