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
import { Component, Inject, ElementRef } from '@angular/core';
import { AppStore } from '../redux/store';
import { Comment } from './comment.model';
import { PlaceholderService } from '../placeholder.service';
var CommentsComponent = (function () {
    function CommentsComponent(store, elemRef, placeholderService) {
        var _this = this;
        this.store = store;
        this.elemRef = elemRef;
        this.placeholderService = placeholderService;
        this.store.subscribe(function () { return _this.readState(); });
        this.readState();
    }
    CommentsComponent.prototype.readState = function () {
        var _this = this;
        var state = this.store.getState();
        var arrPost = state.posts.filter(function (item) { return item._id == _this.postId; });
        if (arrPost.length > 0) {
            this.comments = arrPost[0].comments;
        }
        else {
            this.comments = [];
        }
    };
    CommentsComponent.prototype.comentar = function (input, author) {
        var newcomment = new Comment({
            author: author,
            body: input,
        });
        this.placeholderService.createComment(newcomment, this.postId, this.indice);
    };
    CommentsComponent.prototype.eliminar_comentario = function (id, indice_comentario) {
        this.placeholderService.deleteComment(this.postId, this.indice, indice_comentario, id);
    };
    CommentsComponent.prototype.editar_comentario = function (id, indice_comentario) {
    };
    CommentsComponent.prototype.ngOnInit = function () {
    };
    return CommentsComponent;
}());
CommentsComponent = __decorate([
    Component({
        selector: 'comments',
        templateUrl: './comments.component.html',
        styleUrls: ['./comments.component.css'],
        inputs: ['comments', 'postId', 'indice']
    }),
    __param(0, Inject(AppStore)),
    __metadata("design:paramtypes", [Object, ElementRef, PlaceholderService])
], CommentsComponent);
export { CommentsComponent };
//# sourceMappingURL=../../../../src/app/comments/comments.component.js.map