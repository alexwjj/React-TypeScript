/*
 * @Descripttion:
 * @version:
 * @Author: alexwjj
 * @Date: 2021-01-21 23:37:24
 * @LastEditors: alexwjj
 * @LastEditTime: 2021-01-23 17:23:58
 */
export interface UserModel {
	id?: number;
	password?: string;
	name?: string;
	phone?: string;
	email?: string;
	roleId?: string;
	createTime?: string;
	__v?: number;
}
