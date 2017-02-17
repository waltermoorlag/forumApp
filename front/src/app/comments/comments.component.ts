import { Component, OnInit, Inject,ElementRef } from '@angular/core';
import {AppState, AppStore} from '../redux/store';
import {Store} from 'redux';
import{Post} from '../post.model';
import {Comment} from './comment.model';
import {PlaceholderService} from '../placeholder.service'

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  inputs: ['comments','postId']
})
export class CommentsComponent implements OnInit {
  comments: Comment[];
  postId: any;


  constructor(@Inject(AppStore) private store:Store<AppState>, private elemRef: ElementRef,public placeholderService: PlaceholderService) {

    this.store.subscribe(() => this.readState())
    this.readState()
   }

   readState(){
     const state:AppState=this.store.getState();
     const arrPost:Post[] =state.posts.filter((item:any) => item._id == this.postId)
     console.log(arrPost);
     if(arrPost.length>0){

       this.comments=arrPost[0].comments
     }else{
       this.comments=[]
     }
   }

  comentar(input:String, author:String){
    const newcomment= new Comment({
      author:author,
      body:input,
    })
this.placeholderService.createComment(newcomment,this.postId)

  }

  ngOnInit() {
  }
}
