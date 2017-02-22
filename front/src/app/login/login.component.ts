import { Component, OnInit } from '@angular/core';
import {PlaceholderService} from '../placeholder.service';
import {Router} from '@angular/router'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public placeholderService: PlaceholderService, public router: Router) { }

  ngOnInit() {
  }

  loginUser(username,pwd){
this.placeholderService.loginUser(username,pwd)
this.router.navigate(['posts'])
  }
registrarUser(){
  this.router.navigate(['users']);
}
}
