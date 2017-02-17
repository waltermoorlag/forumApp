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
import { AppStore } from '../redux/store';
var PostComponent = (function () {
    function PostComponent(store) {
        var _this = this;
        this.store = store;
        this.store.subscribe(function () { return _this.readState(); });
        this.readState();
    }
    PostComponent.prototype.readState = function () {
        var state = this.store.getState();
        this.posts = state.posts;
    };
    PostComponent.prototype.ngOnInit = function () {
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
    __metadata("design:paramtypes", [Object])
], PostComponent);
export { PostComponent };
//# sourceMappingURL=../../../../src/app/post/post.component.js.map