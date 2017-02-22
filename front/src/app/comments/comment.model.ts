export class Comment {
  	author: String;
  	body: String;
  	date: Date;
    isEdit: boolean;

	constructor(obj){
	  	this.author=obj.author
	  	this.body=obj.body
	  	this.date=obj.date
      this.isEdit=obj.isEdit || false
	}
}
