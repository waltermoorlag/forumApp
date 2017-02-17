 import {Comment} from './comments/comment.model';

export class Post {
  	author: String;
  	title: String;
  	body: String;
  	date: Date;
  	comments: Comment[];

	constructor(obj){
	  	this.author=obj.author
	  	this.title=obj.title
	  	this.body=obj.body
	  	this.date=obj.date
	  	this.comments=obj.comments
	}
}
