import { Component, OnInit, Inject,ElementRef, Directive, Input, Renderer, EventEmitter } from '@angular/core';
import {AppState, AppStore} from '../redux/store';
import {Store,Action} from 'redux';
import{Post} from '../post.model';
import {Comment} from './comment.model';
import {PlaceholderService} from '../placeholder.service'
import * as AppActions from '../redux/actions';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  inputs: ['comments','postId','indice','authorpost'],
})
export class CommentsComponent implements OnInit {
  comments: Comment[];
  postId: any;
  indice: number;
  authorpost:string;
  username:string;
  public focusSettingEventEmitter = new EventEmitter<boolean>();

  constructor(@Inject(AppStore) private store:Store<AppState>,@Inject(ElementRef) private elemRef: ElementRef,private renderer:Renderer, public placeholderService: PlaceholderService) {

    this.store.subscribe(() => this.readState())
    this.readState()
   }

   readState(){
     const state:AppState=this.store.getState();
     this.username=state.user['username'];
     const arrPost:Post[] =state.posts.filter((item:any) => item._id == this.postId)
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
    this.placeholderService.createComment(newcomment,this.postId,this.indice)

  }

  eliminar_comentario(id:string,indice_comentario:number){
    this.placeholderService.deleteComment(this.postId,this.indice,indice_comentario,id)
  }
  editar_comentario(indice_comentario:number){
    console.log('editando comment => ',indice_comentario)
    this.store.dispatch(AppActions.editando_Comment(this.indice, indice_comentario))
  }
  editComment(cuerpo:string,indice_comentario:number,id:string){
    this.placeholderService.editComment(cuerpo,this.indice,indice_comentario,id)
  }
  ngOnInit() {
  }

    ngAfterViewInit() {
        this.focusSettingEventEmitter.emit(true);
    }
    setFocus(): void {
      this.focusSettingEventEmitter.emit(true);
    }



}
