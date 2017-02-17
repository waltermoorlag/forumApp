import {Store, Action, Reducer, createStore, StoreEnhancer} from 'redux';
import * as AppActions from './actions';
import {OpaqueToken} from '@angular/core'

export interface AppState{
	user: {},
	posts: Post[],
	comments: Comment[]
}

const initialState: AppState = {
	user: {
		username:'',
		logged: false
	},
	posts: [],
	comments: []
}

const reducer: Reducer<AppState> = (state: AppState = initialState, action: Action) =>{
	switch (action.type) {
		case AppActions.LOGIN_USER:
				return state;

		case AppActions.LOGOUT_USER:
			return state;

		case AppActions.CREATE_POST:
			return state;

		case AppActions.EDIT_POST:
			return state;
		
		case AppActions.DELETE_POST:
			return state;

		case AppActions.CREATE_COMMENT:
			return state;

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

