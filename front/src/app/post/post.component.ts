import { Component, OnInit, Inject,Pipe,PipeTransform } from '@angular/core';
import{Post} from '../post.model'
import {PlaceholderService} from '../placeholder.service'
import{ Store, Action} from 'redux';
import * as AppActions from '../redux/actions';
import {AppState, AppStore} from '../redux/store'

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
posts:Post[];
username:string;

  constructor(@Inject(AppStore) private store:Store<AppState>, public placeholderService: PlaceholderService) {
    this.store.subscribe(() => this.readState())
    this.readState()
   }

   readState(){
     const state:AppState=this.store.getState();
     this.posts=state.posts
     this.username=state.user['username'];
   }

   editarPost(index: number){
     this.store.dispatch(AppActions.editandoPost(index))
   }


  ngOnInit() {

  }
editaPost(i:number, PostId:string, title:string, body:string){
  this.placeholderService.editPost(i, PostId, this.username, title, body)
}

cancelEdit(index:number){
  this.store.dispatch(AppActions.editandoPost(index))
}

eliminarPost(indicepost:number, postId:string){

  this.placeholderService.deletePost(indicepost, postId, this.username)
}
}
