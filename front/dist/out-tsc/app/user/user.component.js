var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PlaceholderService } from '../placeholder.service';
import { User } from "../user.model";
import { Router } from "@angular/router";
var UserComponent = (function () {
    function UserComponent(fb, placeholderService, router) {
        this.placeholderService = placeholderService;
        this.router = router;
        this.formUser = fb.group({
            name: [''],
            username: [''],
            pwd: [''],
            pwdrepeat: ['']
        });
    }
    UserComponent.prototype.onSubmit = function (formUser) {
        var _this = this;
        var aUser = new User({
            name: formUser.name,
            username: formUser.username,
            pwd: formUser.pwd,
            pwdrepeat: formUser.pwdrepeat,
        });
        this.placeholderService.createUser(aUser).subscribe(function (obj) {
            console.log(obj);
            if (obj['error']) {
                console.log(obj['msj']);
            }
            else {
                _this.router.navigate(["posts"]);
            }
        });
    };
    UserComponent.prototype.ngOnInit = function () {
    };
    return UserComponent;
}());
UserComponent = __decorate([
    Component({
        selector: 'user',
        templateUrl: './user.component.html',
        styleUrls: ['./user.component.css']
    }),
    __metadata("design:paramtypes", [FormBuilder, PlaceholderService, Router])
], UserComponent);
export { UserComponent };
//# sourceMappingURL=../../../../src/app/user/user.component.js.map