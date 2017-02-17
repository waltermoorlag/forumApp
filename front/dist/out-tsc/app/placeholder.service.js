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
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import * as AppActions from './redux/actions';
import { AppStore } from './redux/store';
export var API_URL = 'http://10.6.6.210:3000/';
var PlaceholderService = (function () {
    function PlaceholderService(url, http, store) {
        this.url = url;
        this.http = http;
        this.store = store;
    }
    PlaceholderService.prototype.createUser = function (user) {
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(API_URL + "login/registrar", body, options).
            map(function (rta) {
            return rta.json();
        });
    };
    PlaceholderService.prototype.createPost = function (post) {
        var _this = this;
        var body = JSON.stringify(post);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        this.http.post(API_URL + "post/" + post.author, body, options).
            map(function (rta) {
            return rta.json();
        }).subscribe(function (obj) {
            if (obj['error']) {
                console.log(obj['msj']);
            }
            else {
                _this.store.dispatch(AppActions.create_post(obj));
            }
        });
    };
    PlaceholderService.prototype.cargarPost = function () {
        var _this = this;
        this.http.get(API_URL + "post").
            map(function (rta) {
            return rta.json();
        }).subscribe(function (obj) {
            if (obj['error']) {
                console.log(obj['msj']);
            }
            else {
                _this.store.dispatch(AppActions.cargar_post(obj));
            }
        });
    };
    PlaceholderService.prototype.createComment = function (comment, id) {
        var _this = this;
        var body = JSON.stringify(comment);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        this.http.post(API_URL + "comment/" + id, body, options).
            map(function (rta) {
            return rta.json();
        }).subscribe(function (obj) {
            if (obj['error']) {
                console.log(obj['msj']);
            }
            else {
                _this.store.dispatch(AppActions.create_comment(obj));
            }
        });
    };
    return PlaceholderService;
}());
PlaceholderService = __decorate([
    Injectable(),
    __param(0, Inject(API_URL)), __param(2, Inject(AppStore)),
    __metadata("design:paramtypes", [Object, Http, Object])
], PlaceholderService);
export { PlaceholderService };
//# sourceMappingURL=../../../src/app/placeholder.service.js.map