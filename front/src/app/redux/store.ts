import {Store, Action, Reducer, createStore, StoreEnhancer} from 'redux';
import * as AppActions from './actions';
import { Post } from '../post.model'
import {OpaqueToken} from '@angular/core'
import {Comment} from '../comments/comment.model'

export interface AppState{
	user: {},
	posts: Post[],
	comments: Comment[],
	isPosting:boolean
}

const initialState: AppState = {
	user: {
		username:'',
		logged: false
	},
	posts: [],
	comments: [],
	isPosting: false,

	// post: {post:Post, comments: Comment[]}
}


const reducer: Reducer<AppState> = (state: AppState = initialState, action: Action) =>{
	switch (action.type) {
		case AppActions.LOGIN_USER:
				return state;

		case AppActions.LOGOUT_USER:
			return state;

		case AppActions.POSTEANDO:
			return Object.assign({},state,{isPosting:true})

		case AppActions.NO_POSTEANDO:
		return Object.assign({},state,{isPosting:false})

	 case AppActions.CREATE_POST:
		   const newPost: Post =  (<AppActions.postAction>action).post
			 console.log(newPost)
			return Object.assign({},state,{isPosting:false, posts:[newPost,...state.posts]});

	 case AppActions.CARGAR_POST:
		   const newPosts: Post[] =  (<AppActions.postsAction>action).posts
			 console.log(newPosts)
			return Object.assign({},state,{isPosting:false, posts:[...state.posts, ...newPosts]})

		case AppActions.EDIT_POST:
			return state;

		case AppActions.DELETE_POST:
			return state;

		case AppActions.CREATE_COMMENT:
		const newComment:Comment =  (<AppActions.commentAction>action).comment
		console.log(newComment);
			 return Object.assign({},state,{comments:[...state.comments, newComment]});

		case AppActions.EDIT_COMMENT:
			return state;

		case AppActions.DELETE_COMMENT:
			return state;

		default:
			return state;
	}
}


const devtools: StoreEnhancer<AppState> = window["devToolsExtension"]?
window["devToolsExtension"](): f=>f;

export let store: Store<AppState> = createStore<AppState>(reducer,devtools);

export const AppStore = new OpaqueToken('App.store');
