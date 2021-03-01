/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-01-21 23:37:24
 * @LastEditors: MFine
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
