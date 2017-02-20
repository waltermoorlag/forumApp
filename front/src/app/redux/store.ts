import {Store, Action, Reducer, createStore, StoreEnhancer} from 'redux';
import * as AppActions from './actions';
import { Post } from '../post.model'
import {OpaqueToken} from '@angular/core'
import {Comment} from '../comments/comment.model'

export interface AppState{
	user: {},
	posts: Post[],
	isPosting:boolean
}

const initialState: AppState = {
	user: {
		username:'',
		logged: false
	},
	posts: [],
	isPosting: false,


}

function postComments(state = [], action){
	switch(action.type){
	  case AppActions.CREATE_COMMENT:

		console.log([...state,{
			author: action.comment.author,
			body: action.comment.body
		}])

	    return[...state,{
	      author: action.comment.author,
	      body: action.comment.body
			}];
	  case AppActions.DELETE_COMMENT:
		  return[
		    ...state.slice(0,action.indexComment),
		    ...state.slice(action.indexComment +1)
		  ];
	   default:
	     return state;
	}
}

const reducer: Reducer<AppState> = (state: AppState = initialState, action: Action) =>{
	switch (action.type) {
		case AppActions.LOGIN_USER:
				return state;

		case AppActions.LOGOUT_USER:
			return state;

		case AppActions.POSTEANDO:
			return Object.assign({},state,{isPosting:true});

		case AppActions.NO_POSTEANDO:
		return Object.assign({},state,{isPosting:false});

	 case AppActions.CREATE_POST:
		   const newPost: Post =  (<AppActions.postAction>action).post
			return Object.assign({},state,{isPosting:false, posts:[newPost,...state.posts]});

	 case AppActions.CARGAR_POST:
		   const newPosts: Post[] =  (<AppActions.postsAction>action).posts
			return Object.assign({},state,{isPosting:false, posts:[...state.posts, ...newPosts]});

		case AppActions.EDIT_POST:
			return state;

		case AppActions.DELETE_POST:
		let indexposte:number =  (<AppActions.postsdeleteAction>action).indexPost
		return Object.assign({},state,{
						posts:[
						...state.posts.slice(0,indexposte),
						...state.posts.slice(indexposte+1)
					]
			});


		case AppActions.CREATE_COMMENT:
			let index:number =  (<AppActions.commentAction>action).index
			var post = Object.assign({},state.posts[index],{ comments: postComments(state.posts[index].comments,(<AppActions.commentAction>action))});
			return Object.assign({},state,{
			  	    posts:[
							...state.posts.slice(0,index),
				     	post,
							...state.posts.slice(index+1)
						]
				});

		case AppActions.EDIT_COMMENT:
			return state;

		case AppActions.DELETE_COMMENT:
		let indexDele:number =  (<AppActions.commentDeleteAction>action).indexPost
		var post = Object.assign({},state.posts[indexDele],{ comments: postComments(state.posts[indexDele].comments,(<AppActions.commentAction>action))});
		return Object.assign({},state,{
						posts:[
						...state.posts.slice(0,indexDele),
						post,
						...state.posts.slice(indexDele+1)
					]
			});

		default:
			return state;
	}
}


const devtools: StoreEnhancer<AppState> = window["devToolsExtension"]?
window["devToolsExtension"](): f=>f;

export let store: Store<AppState> = createStore<AppState>(reducer,devtools);

export const AppStore = new OpaqueToken('App.store');
