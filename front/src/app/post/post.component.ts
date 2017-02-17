import { Component, OnInit, Inject } from '@angular/core';
import {AppState, AppStore} from '../redux/store';
import {Store} from 'redux';
import{Post} from '../post.model'

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
posts:Post[]
  constructor(@Inject(AppStore) private store:Store<AppState>) {
    this.store.subscribe(() => this.readState())
    this.readState()
   }

   readState(){
     const state:AppState=this.store.getState();
     this.posts=state.posts
   }



  ngOnInit() {
  }

}
