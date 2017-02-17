export class User {
	username: String;
	pwd: String;
	pwdrepeat:String;
	name: String;

	constructor(obj){
		this.username=obj.username;
		this.pwd=obj.pwd;
		this.pwdrepeat=obj.pwdrepeat;
		this.name=obj.name;
	}
}