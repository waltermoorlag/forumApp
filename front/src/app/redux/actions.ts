import {Action, ActionCreator} from 'redux';
import { User } from '../user.model'
import { Post } from '../post.model'
import { Comment } from '../comments/comment.model'


export const LOGIN_USER:string='LOGIN_USER'
export const LOGOUT_USER:string='LOGOUT_USER'
export const EDIT_POST :string='EDIT_POST'
export const CREATE_POST :string='CREATE_POST'
export const DELETE_POST :string='DELETE_POST'
export const CREATE_COMMENT:string='CREATE_COMMENT'
export const EDIT_COMMENT :string='EDIT_COMMENT'
export const DELETE_COMMENT :string='DELETE_COMMENT'
export const CARGAR_POST :string='CARGAR_POST'
export const POSTEANDO :string='POSTEANDO'
export const NO_POSTEANDO :string='NO_POSTEANDO'
export const EDITANDO_POST :string='EDITANDO_POST'
export const EDITANDO_COMMENT: string='EDITANDO_COMMENT'

export interface userAction extends Action {
	user: User;
}

export interface postAction extends Action {
	post: Post;
}
export interface postsAction extends Action {
	posts: Post[];
}
export interface postsdeleteAction extends Action {
	indexPost: number;
}
export interface commentAction extends Action {
	comment: Comment;
	index:number;
}
export interface commentIndiceAction extends Action {
	indexPost:number;
	indexComment: number;
}
export interface commentEditAction extends Action {
	indexPost:number;
	indexComment: number;
	comment: Comment;
}

export interface postEditAction extends Action {
	indexPost:number;
	title:string;
	body:string;

}


export const posteando :ActionCreator<Action>=()=>{
	return {type: POSTEANDO,}
}
export const no_posteando :ActionCreator<Action>=()=>{
	return {type: NO_POSTEANDO,}
}

export const login_user: ActionCreator<userAction> = (user: User)=>{
	return {type: LOGIN_USER,
			user}
}

export const logout: ActionCreator<Action> = ()=>{
	return {type: LOGOUT_USER
			}
}

export const create_post: ActionCreator<Action> = (post: Post)=>{
	return {type: CREATE_POST,
			post}
}
export const cargar_post: ActionCreator<Action> = (posts: Post[])=>{
	return {type: CARGAR_POST,
			posts}
}

export const delete_post: ActionCreator<postsdeleteAction> = (indexPost:number)=>{
	return {type: DELETE_POST,
			indexPost}
}

export const create_comment: ActionCreator<commentAction> = (index:number, comment: Comment)=>{
	return {type: CREATE_COMMENT,
			comment,
			index}
}

export const edit_comment: ActionCreator<commentEditAction> = (indexPost:number, indexComment:number, comment: Comment)=>{
	return {type: EDIT_COMMENT,
		  indexPost,
			indexComment,
			comment
		}
}
export const delete_comment: ActionCreator<commentIndiceAction> = (indexPost:number,indexComment: number)=>{
	return {type: DELETE_COMMENT,
			indexPost,
			indexComment}
}

export const editandoPost: ActionCreator<Action> =  (index: number) => {
	return {type: EDITANDO_POST,
			index}
}

export const edit_post: ActionCreator<postEditAction> = (indexPost:number, title:string, body:string)=>{
	return {type: EDIT_POST,
			indexPost,
			title,
			body}
}
export const editando_Comment: ActionCreator<commentIndiceAction> = (indexPost:number,indexComment: number)=>{
	return {type: EDITANDO_COMMENT,
			indexPost,
			indexComment}
}
