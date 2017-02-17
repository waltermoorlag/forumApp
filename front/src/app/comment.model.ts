export class Comment {
  	author: String;
  	body: String;
  	date: date;
  	
	constructor(obj){
	  	this.author=obj.author
	  	this.body=obj.body
	  	this.date=obj.date
	}
}