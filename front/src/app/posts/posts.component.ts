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
 }






onSubmit(formPost):void{
      const aPost= new Post ({
        author:formPost.username,
        title:formPost.title,
        body:formPost.body,
      })

this.placeholderService.createPost(aPost)


// this.placeholderService.createPost(aPost).subscribe(obj=>{
//   console.log(obj)
//   if(obj['error']){
//     console.log(obj['msj'])
//   }else{
//   this.store.dispatch(AppActions.create_post(obj))
//   }
//
// })

}
fcShowPost(){
this.store.dispatch(AppActions.posteando())
}
fcHidePost(){
this.store.dispatch(AppActions.no_posteando())
}

ngOnInit() {
  this.placeholderService.cargarPost()
}

}
