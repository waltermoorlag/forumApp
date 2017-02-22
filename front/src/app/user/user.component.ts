import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators, FormControl } from '@angular/forms';
import {PlaceholderService} from '../placeholder.service';
import {User} from "../user.model"
import {Router} from "@angular/router"


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 formUser: FormGroup;

	constructor(fb: FormBuilder, public placeholderService: PlaceholderService, public router:Router ){
		this.formUser = fb.group({
			name:[''],
  			username: [''],
        	pwd:[''],
			pwdrepeat:['']
		})
	}

	onSubmit(formUser):void{

        const aUser= new User ({
         	name: formUser.name,
  			username:formUser.username,
        	pwd:formUser.pwd,
			pwdrepeat:formUser.pwdrepeat,
        })

	this.placeholderService.createUser(aUser).subscribe(obj=>{
		console.log(obj)
		if(obj['error']){
			console.log(obj['msj'])
		}else{
			this.router.navigate(["posts"])
		}

	})

	}


  ngOnInit() {
  }



}
