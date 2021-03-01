/*
 * @Descripttion: 
 * @version: 
 * @Author: MFine
 * @Date: 2020-10-21 17:11:52
 * @LastEditors: MFine
 * @LastEditTime: 2020-11-29 15:48:03
 */
export interface ICategory {
	parentId: string;
	_id: string;
	name: string;
	__v: number;
	categoryName: string;
	parentName: string;
}

export interface CategoryModel {
	parentId: string;
	id: number;
	name: string;
	categoryName: string;
	parentName: string;
}