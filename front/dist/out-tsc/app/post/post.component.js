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
import { PlaceholderService } from '../placeholder.service';
import * as AppActions from '../redux/actions';
import { AppStore } from '../redux/store';
var PostComponent = (function () {
    function PostComponent(store, placeholderService) {
        var _this = this;
        this.store = store;
        this.placeholderService = placeholderService;
        this.store.subscribe(function () { return _this.readState(); });
        this.readState();
    }
    PostComponent.prototype.readState = function () {
        var state = this.store.getState();
        this.posts = state.posts;
        this.username = state.user['username'];
    };
    PostComponent.prototype.editarPost = function (index) {
        this.store.dispatch(AppActions.editandoPost(index));
    };
    PostComponent.prototype.ngOnInit = function () {
    };
    PostComponent.prototype.editaPost = function (i, PostId, title, body) {
        this.placeholderService.editPost(i, PostId, this.username, title, body);
    };
    PostComponent.prototype.cancelEdit = function (index) {
        this.store.dispatch(AppActions.editandoPost(index));
    };
    PostComponent.prototype.eliminarPost = function (indicepost, postId) {
        this.placeholderService.deletePost(indicepost, postId, this.username);
    };
    return PostComponent;
}());
PostComponent = __decorate([
    Component({
        selector: 'post',
        templateUrl: './post.component.html',
        styleUrls: ['./post.component.css']
    }),
    __param(0, Inject(AppStore)),
    __metadata("design:paramtypes", [Object, PlaceholderService])
], PostComponent);
export { PostComponent };
//# sourceMappingURL=../../../../src/app/post/post.component.js.map