var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PlaceholderService } from '../placeholder.service';
import { Post } from "../post.model";
import { Router } from "@angular/router";
import * as AppActions from '../redux/actions';
import { AppStore } from '../redux/store';
var PostsComponent = (function () {
    function PostsComponent(fb, placeholderService, router, store) {
        var _this = this;
        this.placeholderService = placeholderService;
        this.router = router;
        this.store = store;
        this.store.subscribe(function () { return _this.readState(); });
        this.readState();
        this.formPost = fb.group({
            username: [''],
            title: [''],
            body: ['']
        });
    }
    PostsComponent.prototype.readState = function () {
        var state = this.store.getState();
        this.isPosting = state.isPosting;
        this.islogged = state.user['logged'];
        this.username = state.user['username'];
    };
    PostsComponent.prototype.logout_user = function () {
        this.placeholderService.logout(this.username);
    };
    PostsComponent.prototype.onSubmit = function (formPost) {
        var aPost = new Post({
            author: this.username,
            title: formPost.title,
            body: formPost.body,
        });
        this.placeholderService.createPost(aPost);
    };
    PostsComponent.prototype.fcShowPost = function () {
        this.store.dispatch(AppActions.posteando());
    };
    PostsComponent.prototype.fcHidePost = function () {
        this.store.dispatch(AppActions.no_posteando());
    };
    PostsComponent.prototype.ngOnInit = function () {
        this.placeholderService.verificaToken();
        this.placeholderService.cargarPost();
    };
    return PostsComponent;
}());
PostsComponent = __decorate([
    Component({
        selector: 'app-posts',
        templateUrl: './posts.component.html',
        styleUrls: ['./posts.component.css']
    }),
    __param(3, Inject(AppStore)),
    __metadata("design:paramtypes", [FormBuilder, PlaceholderService, Router, Object])
], PostsComponent);
export { PostsComponent };
//# sourceMappingURL=../../../../src/app/posts/posts.component.js.map