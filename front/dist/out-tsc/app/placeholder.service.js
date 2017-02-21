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
export var API_URL = 'http://10.6.6.98:3000/';
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
        var options = new RequestOptions({ withCredentials: true });
        this.http.get(API_URL + "post", options).
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
    PlaceholderService.prototype.createComment = function (comment, id, index) {
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
                _this.store.dispatch(AppActions.create_comment(index, obj));
            }
        });
    };
    PlaceholderService.prototype.deleteComment = function (postId, indicePost, indice_comentario, commentId) {
        var _this = this;
        this.http.delete(API_URL + "comment/" + commentId).
            map(function (rta) {
            return rta.json();
        }).subscribe(function (obj) {
            if (obj['error']) {
                console.log(obj['msj']);
            }
            else {
                _this.store.dispatch(AppActions.delete_comment(indicePost, indice_comentario));
            }
        });
    };
    PlaceholderService.prototype.editPost = function (indexPost, postId, username, title, cuerpo) {
        var _this = this;
        var body = JSON.stringify({ title: title, body: cuerpo });
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers, withCredentials: true });
        this.http.put(API_URL + "post/" + postId + "/" + username, body, options).
            map(function (rta) {
            return rta.json();
        }).subscribe(function (obj) {
            if (obj['error']) {
                console.log(obj['msj']);
            }
            else {
                _this.store.dispatch(AppActions.edit_post(indexPost, title, cuerpo));
            }
        });
    };
    PlaceholderService.prototype.deletePost = function (indicePost, postId, user) {
        var _this = this;
        this.http.delete(API_URL + "post/" + postId + "/" + user).
            map(function (rta) {
            return rta.json();
        }).subscribe(function (obj) {
            if (obj['error']) {
                console.log(obj['msj']);
            }
            else {
                _this.store.dispatch(AppActions.delete_post(indicePost));
            }
        });
    };
    PlaceholderService.prototype.loginUser = function (username, pwd) {
        var _this = this;
        var body = JSON.stringify({ username: username, pwd: pwd });
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers, withCredentials: true });
        this.http.post(API_URL + "login", body, options).
            map(function (rta) {
            return rta.json();
        }).subscribe(function (obj) {
            if (obj['error']) {
                console.log(obj['msj']);
            }
            else {
                _this.store.dispatch(AppActions.login_user(obj));
            }
        });
    };
    PlaceholderService.prototype.logout = function (username) {
        var _this = this;
        var body = JSON.stringify({ username: username });
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers, withCredentials: true });
        this.http.post(API_URL + "login/logout", body, options).
            map(function (rta) {
            return rta.json();
        }).subscribe(function (obj) {
            if (obj['error']) {
                console.log(obj['msj']);
            }
            else {
                console.log('msj de deslogueo', obj);
                _this.store.dispatch(AppActions.logout());
            }
        });
    };
    PlaceholderService.prototype.verificaToken = function () {
        var _this = this;
        var body = JSON.stringify({});
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers, withCredentials: true });
        this.http.post(API_URL + "login/verificauser", body, options).
            map(function (rta) {
            return rta.json();
        }).subscribe(function (obj) {
            if (obj['error']) {
                console.log(obj['msj']);
            }
            else {
                console.log(obj);
                if (obj)
                    _this.store.dispatch(AppActions.login_user(obj));
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