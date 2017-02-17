import { createStore } from 'redux';
import * as AppActions from './actions';
import { OpaqueToken } from '@angular/core';
var initialState = {
    user: {
        username: '',
        logged: false
    },
    posts: [],
    comments: [],
    isPosting: false,
};
var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case AppActions.LOGIN_USER:
            return state;
        case AppActions.LOGOUT_USER:
            return state;
        case AppActions.POSTEANDO:
            return Object.assign({}, state, { isPosting: true });
        case AppActions.NO_POSTEANDO:
            return Object.assign({}, state, { isPosting: false });
        case AppActions.CREATE_POST:
            var newPost = action.post;
            console.log(newPost);
            return Object.assign({}, state, { isPosting: false, posts: [newPost].concat(state.posts) });
        case AppActions.CARGAR_POST:
            var newPosts = action.posts;
            console.log(newPosts);
            return Object.assign({}, state, { isPosting: false, posts: state.posts.concat(newPosts) });
        case AppActions.EDIT_POST:
            return state;
        case AppActions.DELETE_POST:
            return state;
        case AppActions.CREATE_COMMENT:
            var newComment = action.comment;
            console.log(newComment);
            return Object.assign({}, state, { comments: state.comments.concat([newComment]) });
        case AppActions.EDIT_COMMENT:
            return state;
        case AppActions.DELETE_COMMENT:
            return state;
        default:
            return state;
    }
};
var devtools = window["devToolsExtension"] ?
    window["devToolsExtension"]() : function (f) { return f; };
export var store = createStore(reducer, devtools);
export var AppStore = new OpaqueToken('App.store');
//# sourceMappingURL=../../../../src/app/redux/store.js.map