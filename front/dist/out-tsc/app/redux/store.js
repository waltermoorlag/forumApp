import { createStore } from 'redux';
import * as AppActions from './actions';
import { OpaqueToken } from '@angular/core';
var initialState = {
    user: {
        username: '',
        logged: false
    },
    posts: [],
    isPosting: false,
};
function postComments(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case AppActions.CREATE_COMMENT:
            console.log(state.concat([{
                    author: action.comment.author,
                    body: action.comment.body
                }]));
            return state.concat([{
                    author: action.comment.author,
                    body: action.comment.body
                }]);
        case AppActions.DELETE_COMMENT:
            return state.slice(0, action.indexComment).concat(state.slice(action.indexComment + 1));
        default:
            return state;
    }
}
var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case AppActions.LOGIN_USER:
            var newUser = action.user;
            return Object.assign({}, state, { user: { logged: true, username: newUser.username } });
        case AppActions.LOGOUT_USER:
            return Object.assign({}, state, { user: { logged: false, username: '' } });
        case AppActions.POSTEANDO:
            return Object.assign({}, state, { isPosting: true });
        case AppActions.NO_POSTEANDO:
            return Object.assign({}, state, { isPosting: false });
        case AppActions.CREATE_POST:
            var newPost = action.post;
            return Object.assign({}, state, { isPosting: false, posts: [newPost].concat(state.posts) });
        case AppActions.CARGAR_POST:
            var newPosts = action.posts;
            return Object.assign({}, state, { isPosting: false, posts: state.posts.concat(newPosts) });
        case AppActions.EDITANDO_POST:
            var indexEdit = action.index;
            var postEditando = Object.assign({}, state.posts[indexEdit], { isEdit: !state.posts[indexEdit].isEdit });
            return Object.assign({}, state, {
                posts: state.posts.slice(0, indexEdit).concat([
                    postEditando
                ], state.posts.slice(indexEdit + 1))
            });
        case AppActions.EDIT_POST:
            var indexofPost = action.indexPost;
            var titlepost = action.title;
            var bodypost = action.body;
            var postEditar = Object.assign({}, state.posts[indexofPost], { isEdit: false, title: titlepost, body: bodypost });
            return Object.assign({}, state, {
                posts: state.posts.slice(0, indexofPost).concat([
                    postEditar
                ], state.posts.slice(indexofPost + 1))
            });
        case AppActions.DELETE_POST:
            var indexposte = action.indexPost;
            return Object.assign({}, state, {
                posts: state.posts.slice(0, indexposte).concat(state.posts.slice(indexposte + 1))
            });
        case AppActions.CREATE_COMMENT:
            var index = action.index;
            var postCreate = Object.assign({}, state.posts[index], { comments: postComments(state.posts[index].comments, action) });
            return Object.assign({}, state, {
                posts: state.posts.slice(0, index).concat([
                    postCreate
                ], state.posts.slice(index + 1))
            });
        case AppActions.EDIT_COMMENT:
            return state;
        case AppActions.DELETE_COMMENT:
            var indexDele = action.indexPost;
            var post = Object.assign({}, state.posts[indexDele], { comments: postComments(state.posts[indexDele].comments, action) });
            return Object.assign({}, state, {
                posts: state.posts.slice(0, indexDele).concat([
                    post
                ], state.posts.slice(indexDele + 1))
            });
        default:
            return state;
    }
};
var devtools = window["devToolsExtension"] ?
    window["devToolsExtension"]() : function (f) { return f; };
export var store = createStore(reducer, devtools);
export var AppStore = new OpaqueToken('App.store');
//# sourceMappingURL=../../../../src/app/redux/store.js.map