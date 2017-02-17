export class Comment {
  	author: String;
  	body: String;
  	date: Date;

	constructor(obj){
	  	this.author=obj.author
	  	this.body=obj.body
	  	this.date=obj.date
	}
}
