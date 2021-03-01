/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-01-04 22:54:12
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-15 21:45:43
 */
export interface RoleModel {
	id?: number;
	name: string;
	createTime: String;
	menus?: string;
  v?: number;
	authTime?: String|null;
	authName?: string;
}
