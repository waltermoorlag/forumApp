import {Store, Action, Reducer, createStore, StoreEnhancer} from 'redux';
import * as AppActions from './actions';
import { Post } from '../post.model'
import {OpaqueToken} from '@angular/core'
import {Comment} from '../comments/comment.model'
import {User} from '../user.model';

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
	    return[...state,action.comment];

		case AppActions.DELETE_COMMENT:
		  return[
		    ...state.slice(0,action.indexComment),
		    ...state.slice(action.indexComment +1)
		  ];

		case AppActions.EDIT_COMMENT:
		console.log('comment recibido => ',action.comment)
		  return[
		    ...state.slice(0,action.indexComment),
				Object.assign({},action.comment,{isEdit: false}),
		    ...state.slice(action.indexComment +1)
		  ];
			case AppActions.EDITANDO_COMMENT:
			  return[
			    ...state.slice(0,action.indexComment),
					Object.assign({},state[action.indexComment],{isEdit: !state[action.indexComment].isEdit }),
			    ...state.slice(action.indexComment +1)
			  ];


		 default:
	     return state;
	}
}

const reducer: Reducer<AppState> = (state: AppState = initialState, action: Action) =>{
	switch (action.type) {

		case AppActions.LOGIN_USER:
		 const newUser: User = (<AppActions.userAction>action).user;
			return Object.assign({},state,{user: {logged:true, username:newUser.username}})

		case AppActions.LOGOUT_USER:
			return Object.assign({},state,{user: {logged:false, username:''}})

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

		case AppActions.EDITANDO_POST:

		let indexEdit:number =  (<AppActions.commentAction>action).index
		var postEditando = Object.assign({},state.posts[indexEdit],{ isEdit: !state.posts[indexEdit].isEdit});
		return Object.assign({},state,{
						posts:[
						...state.posts.slice(0,indexEdit),
						postEditando,
						...state.posts.slice(indexEdit+1)
					]
			});

		case AppActions.EDIT_POST:
		let indexofPost:number=(<AppActions.postEditAction>action).indexPost
		let titlepost:string=(<AppActions.postEditAction>action).title
		let bodypost:string=(<AppActions.postEditAction>action).body
			var postEditar = Object.assign({},state.posts[indexofPost],{ isEdit: false,title:titlepost ,body:bodypost});
		return Object.assign({},state,{
						posts:[
						...state.posts.slice(0,indexofPost),
						postEditar,
						...state.posts.slice(indexofPost+1)
					]
			});


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
			var postCreate = Object.assign({},state.posts[index],{ comments: postComments(state.posts[index].comments,(<AppActions.commentAction>action))});
			return Object.assign({},state,{
			  	    posts:[
							...state.posts.slice(0,index),
				     	postCreate,
							...state.posts.slice(index+1)
						]
				});

		case AppActions.EDIT_COMMENT:
		let indexPostEditComment:number =  (<AppActions.commentEditAction>action).indexPost
		var CommentPostEdit = Object.assign({},state.posts[indexPostEditComment],{ comments: postComments(state.posts[indexPostEditComment].comments,(<AppActions.commentAction>action))});
		return Object.assign({},state,{
						posts:[
						...state.posts.slice(0,indexPostEditComment),
						CommentPostEdit,
						...state.posts.slice(indexPostEditComment+1)
					]
			});


		case AppActions.DELETE_COMMENT:
		let indexDele:number =  (<AppActions.commentIndiceAction>action).indexPost
		var post = Object.assign({},state.posts[indexDele],{ comments: postComments(state.posts[indexDele].comments,(<AppActions.commentIndiceAction>action))});
		return Object.assign({},state,{
						posts:[
						...state.posts.slice(0,indexDele),
						post,
						...state.posts.slice(indexDele+1)
					]
			});
			case AppActions.EDITANDO_COMMENT:
			let indexediting:number =  (<AppActions.commentIndiceAction>action).indexPost
			var post = Object.assign({},state.posts[indexediting],{ comments: postComments(state.posts[indexediting].comments,(<AppActions.commentIndiceAction>action))});
			console.log('editand comment en el store: => indice post:',indexediting)
			return Object.assign({},state,{
							posts:[
							...state.posts.slice(0,indexediting),
							post,
							...state.posts.slice(indexediting+1)
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
