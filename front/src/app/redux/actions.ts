import {Action, ActionCreator} from 'redux';
import { User } from '../user.model'
import { Post } from '../user.Post'
import { Comment } from '../user.Comment'


export interface userAction extends Action {
	user: User;
}

export interface postAction extends Action {
	post: Post;
}

export interface commentAction extends Action {
	comment: Comment;
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