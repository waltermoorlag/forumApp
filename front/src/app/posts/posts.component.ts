import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder,FormGroup, Validators, FormControl } from '@angular/forms';
import {PlaceholderService} from '../placeholder.service';
import {Post} from "../post.model"
import {Router} from "@angular/router"
import{ Store, Action} from 'redux';
import * as AppActions from '../redux/actions';
import {AppState, AppStore} from '../redux/store'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
 formPost: FormGroup;
 isPosting:boolean;
 islogged:boolean;
 username:string;



constructor(fb: FormBuilder, public placeholderService: PlaceholderService, public router:Router,
@Inject(AppStore) private store:Store<AppState>){

  this.store.subscribe(() => this.readState())
  this.readState()

  this.formPost = fb.group({
    username: [''],
    title:[''],
    body:['']
  })
}

 readState(){
   const state:AppState=this.store.getState();
   this.isPosting=state.isPosting
   this.islogged=state.user['logged']
   this.username=state.user['username']
 }

logout_user():void{
  this.placeholderService.logout(this.username)
}

onSubmit(formPost):void{
      const aPost= new Post ({
        author:this.username,
        title:formPost.title,
        body:formPost.body,
      })
      this.placeholderService.createPost(aPost)
}

fcShowPost(){
this.store.dispatch(AppActions.posteando())
}
fcHidePost(){
this.store.dispatch(AppActions.no_posteando())
}

ngOnInit() {
  this.placeholderService.verificaToken()
  this.placeholderService.cargarPost()
}

}
