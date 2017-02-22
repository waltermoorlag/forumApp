import { Injectable,Inject } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs';
import {User} from './user.model';
import {Post} from './post.model';
import{ Store, Action} from 'redux';
import * as AppActions from './redux/actions';
import {AppState, AppStore} from './redux/store'
import {Comment} from './comments/comment.model'

export const API_URL ='http://10.6.6.98:3000/'

@Injectable()
export class PlaceholderService {

  constructor(@Inject(API_URL) public url, public http:Http, @Inject(AppStore) private store:Store<AppState> ) { }

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
      return  rta.json()})

  }
    //  createPost(post:Post):Observable<Response>{
    //    let body= JSON.stringify(post);
    //    let headers= new Headers({'Content-Type':'application/json'});
    //    let options = new RequestOptions({headers: headers});
    //    return this.http.post(`${API_URL}post/${post.author}`,body,options).
    //    map(rta => {
    //      console.log(rta)
    //      return  rta.json()})
    //  }
    createPost(post:Post):void{
      let body= JSON.stringify(post);
      let headers= new Headers({'Content-Type':'application/json'});
      let options = new RequestOptions({headers: headers});
      this.http.post(`${API_URL}post/${post.author}`,body,options).
      map(rta => {
        return  rta.json()}).subscribe(obj=>{
          if(obj['error']){
            console.log(obj['msj'])
          }else{
          this.store.dispatch(AppActions.create_post(obj))
          }

        })

    }

    cargarPost():void{
      let options = new RequestOptions({ withCredentials: true});
      this.http.get(`${API_URL}post`,options).
      map(rta => {
        return  rta.json()}).subscribe(obj=>{
          if(obj['error']){
            console.log(obj['msj'])
          }else{
          this.store.dispatch(AppActions.cargar_post(obj))
          }

        })

    }
    createComment(comment:Comment, id:any,index:number):void{
      let body= JSON.stringify(comment);
      let headers= new Headers({'Content-Type':'application/json'});
      let options = new RequestOptions({headers: headers});
      this.http.post(`${API_URL}comment/${id}`,body,options).
      map(rta => {
        return  rta.json()}).subscribe(obj=>{
          if(obj['error']){
            console.log(obj['msj'])
          }else{
          this.store.dispatch(AppActions.create_comment(index,obj))
          }

        })
    }

deleteComment(postId:any,indicePost:number,indice_comentario:number,commentId:any):void{
console.log(commentId);
  this.http.delete(`${API_URL}comment/${commentId}`).

    map(rta => {
    return  rta.json()}).subscribe(obj=>{
      if(obj['error']){
        console.log(obj['msj'])
      }else{
        this.store.dispatch(AppActions.delete_comment(indicePost,indice_comentario))
      }

    })
}
editPost(indexPost:number, postId:string, username:string, title:string, cuerpo:string):void{
  let body= JSON.stringify({title,body:cuerpo});
  let headers= new Headers({'Content-Type':'application/json'});
  let options = new RequestOptions({headers: headers, withCredentials: true});
  this.http.put(`${API_URL}post/${postId}/${username}`,body,options).
  map(rta => {
    return  rta.json()}).subscribe(obj=>{
      if(obj['error']){
        console.log(obj['msj'])
      }else{
      this.store.dispatch(AppActions.edit_post(indexPost,title,cuerpo))
      }

    })
}

deletePost(indicePost:number, postId:any, user:string):void{
  this.http.delete(`${API_URL}post/${postId}/${user}`,).
  map(rta => {
    return  rta.json()}).subscribe(obj=>{
      if(obj['error']){
        console.log(obj['msj'])
      }else{
        this.store.dispatch(AppActions.delete_post(indicePost))
      }

    })
}

loginUser(username:string, pwd:string):void{
  let body= JSON.stringify({username, pwd});
  let headers= new Headers({'Content-Type':'application/json'});
  let options = new RequestOptions({headers: headers,withCredentials: true});
  this.http.post(`${API_URL}login`,body,options).
  map(rta => {
    return  rta.json()}).subscribe(obj=>{
      if(obj['error']){
        console.log(obj['msj'])
      }else{
        this.store.dispatch(AppActions.login_user(obj))
      }
    })
}
logout(username:string):void{
  let body= JSON.stringify({username});
  let headers= new Headers({'Content-Type':'application/json'});
  let options = new RequestOptions({headers: headers,withCredentials: true});
  this.http.post(`${API_URL}login/logout`,body,options).
  map(rta => {
    return  rta.json()}).subscribe(obj=>{
      if(obj['error']){
        console.log(obj['msj'])
      }else{
        console.log('msj de deslogueo',obj)

        this.store.dispatch(AppActions.logout())
      }
    })
  }
  verificaToken():void{
    let body=JSON.stringify({});
    let headers= new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    this.http.post(`${API_URL}login/verificauser`,body,options).
    map(rta => {
      return  rta.json()}).subscribe(obj=>{
        if(obj['error']){
          console.log(obj['msj'])
        }else{
          console.log(obj)
          if(obj)

            this.store.dispatch(AppActions.login_user(obj))
        }
      })

  }
  editComment(cuerpo:string,indexPost:number,indexComment:number, CommentId:string ):void{
    let body= JSON.stringify({body:cuerpo});
    let headers= new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    this.http.put(`${API_URL}comment/${CommentId}`,body,options).
    map(rta => {
      return  rta.json()}).subscribe(obj=>{
        if(obj['error']){
          console.log(obj['msj'])
        }else{
        this.store.dispatch(AppActions.edit_comment(indexPost,indexComment,obj))
        }

      })
  }





}
