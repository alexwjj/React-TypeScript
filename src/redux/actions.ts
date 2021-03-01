import { reqRoleById } from './../api/index';
import { reqLogin } from '../api';
import { RECEIVE_USER, RESET_USER, SET_HEAD_TITLE, SHOW_ERROR_MSG } from './action-types';
import StorageUtils, { LoginUser } from '../utils/StorageUtils';
import { createAction } from 'typesafe-actions';
/*
 * @Descripttion: 包含多个action creator的函数模块
 * @version:
 * @Author: MFine
 * @Date: 2021-01-27 23:38:20
 * @LastEditors: MFine
 * @LastEditTime: 2021-02-02 23:48:19
 */
export const setHeadTitle = createAction(SET_HEAD_TITLE)<string>();

export const receiveUser = createAction(RECEIVE_USER)<LoginUser>();

export const showErrorMsg = createAction(SHOW_ERROR_MSG)<LoginUser>();

export const logout = createAction(RESET_USER)<void>();

export const login = (username: string, password: string) => async (dispatch: any) => {
	const result = await reqLogin(username, password);
	if (result.status === 0) {
		const user = result.data;
		if (user) {
			const role = await reqRoleById(user.roleId ?? '');
			StorageUtils.saveUser({
				id: user.id ?? -1,
				name: user.name ?? '',
				menus: role.menus?.split(',') ?? [],
				roleId: role.id?.toString() ?? '',
			});
			dispatch(receiveUser({ id: user.id, name: user.name, roleId: user.roleId, menus: role.menus?.split(',') }));
		} else {
			dispatch(showErrorMsg({errorMsg:'用户名或密码错误'}));
		}
	} else {
		dispatch(showErrorMsg({errorMsg:'用户名或密码错误'}));
	}
};
