import { combineReducers } from 'redux';
import StorageUtils, { LoginUser } from '../utils/StorageUtils';
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './action-types';
/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-01-27 23:37:19
 * @LastEditors: MFine
 * @LastEditTime: 2021-02-02 23:46:10
 */

//管理头部标题
const initHeadTitle = '首页';

function headTitle(state: string = initHeadTitle, action: { type: any; payload: string }) {
	switch (action.type) {
		case SET_HEAD_TITLE:
			return action.payload;
		default:
			return state;
	}
}

//管理登录用户
const initUser = StorageUtils.getUser();

function user(state: LoginUser = initUser, action: { type: any; payload: LoginUser }) {
	switch (action.type) {
		case RECEIVE_USER:
			return action.payload;
		case SHOW_ERROR_MSG:
			const errorMsg = action.payload.errorMsg;
			return { ...state, errorMsg };
		case RESET_USER:
      StorageUtils.removeUser();
			return {};
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	headTitle,
	user,
});

export default rootReducer;
