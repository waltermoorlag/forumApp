import { Injectable,Inject } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs';
import {User} from './user.model';

export const API_URL ='http://10.6.6.98:3000/'

@Injectable()
export class PlaceholderService {

  constructor(@Inject(API_URL) public url, public http:Http) { }

  // query(id, type): Observable<Response>{
  // 	return this.http.request(`${this.url}${type}/${id}`)
  // 	.map(res => res.json())


// Observable<Response>

  createUser(user: User):Observable<Response>{
  	let body= JSON.stringify(user);
  	let headers= new Headers({'Content-Type':'application/json'});
  	let options = new RequestOptions({headers: headers});
  	return this.http.post(`${API_URL}login/registrar`,body,options).
  	map(rta => {
      console.log(rta)
      return  rta.json()})

  }
 

 }
