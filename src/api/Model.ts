/*
 * @Descripttion:
 * @version:
 * @Author: alexwjj
 * @Date: 2020-11-28 16:40:32
 * @LastEditors: alexwjj
 * @LastEditTime: 2020-12-15 23:15:09
 */
//自定义返回类型
export interface ResponseValue<T> {
	flag?: boolean;
	status?: number;
	message?: string;
	data?: T;
}

//分页数据模型
export interface PageSplitModel<T> {
	endRow: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	isFirstPage: boolean;
	isLastPage: boolean;
	list: T[] | undefined;
	navigateFirstPage: number;
	navigateLastPage: number;
	navigatePages: number;
	navigatepageNums: number[];
	nextPage: number;
	pageNum: number;
	pageSize: number;
	pages: number;
	prePage: number;
	size: number;
	startRow: number;
	total: number;
}
