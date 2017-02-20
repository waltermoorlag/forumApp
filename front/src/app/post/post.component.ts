import { Component, OnInit, Inject,Pipe,PipeTransform } from '@angular/core';
import {AppState, AppStore} from '../redux/store';
import {Store} from 'redux';
import{Post} from '../post.model'
import {PlaceholderService} from '../placeholder.service'

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
posts:Post[]

  constructor(@Inject(AppStore) private store:Store<AppState>, public placeholderService: PlaceholderService) {
    this.store.subscribe(() => this.readState())
    this.readState()
   }

   readState(){
     const state:AppState=this.store.getState();
     this.posts=state.posts
   }



  ngOnInit() {
  }
eliminarPost(indicepost:number, postId:string){
  const user="test"
  this.placeholderService.deletePost(indicepost, postId, user)
}
}

// @Pipe({
//     name: 'mapToIterable'
// })
// export class MapToIterable {
//     transform(map: {}, args: any[] = null): any {
//         if (!map)
//             return null;
//         return Object.keys(map)
//             .map((key) => ({ 'key': key, 'value': map[key] }));
//     }
// }
