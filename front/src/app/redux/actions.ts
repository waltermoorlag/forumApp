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



export interface userAction extends Action {
	user: User;
}

export interface postAction extends Action {
	post: Post;
}
export interface postsAction extends Action {
	posts: Post[];
}

export interface commentAction extends Action {
	comment: Comment;
}

export const posteando :ActionCreator<Action>=()=>{
	return {type: POSTEANDO,}
}
export const no_posteando :ActionCreator<Action>=()=>{
	return {type: NO_POSTEANDO,}
}

export const login: ActionCreator<userAction> = (user: User)=>{
	return {type: LOGIN_USER,
			user}
}

export const logout: ActionCreator<userAction> = (user: User)=>{
	return {type: LOGOUT_USER,
			user}
}

export const create_post: ActionCreator<Action> = (post: Post)=>{
	return {type: CREATE_POST,
			post}
}
export const cargar_post: ActionCreator<Action> = (posts: Post[])=>{
	return {type: CARGAR_POST,
			posts}
}

export const edit_post: ActionCreator<postAction> = (post: Post)=>{
	return {type: EDIT_POST,
			post}
}
export const delete_post: ActionCreator<postAction> = (post: Post)=>{
	return {type: DELETE_POST,
			post}
}

export const create_comment: ActionCreator<commentAction> = (comment: Comment)=>{
	return {type: CREATE_COMMENT,
			comment}
}

export const edit_comment: ActionCreator<commentAction> = (comment: Comment)=>{
	return {type: EDIT_COMMENT,
			comment}
}
export const delete_comment: ActionCreator<commentAction> = (comment: Comment)=>{
	return {type: DELETE_COMMENT,
			comment}
}
