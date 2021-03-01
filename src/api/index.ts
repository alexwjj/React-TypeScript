/*
 * @Descripttion:
 * @version:
 * @Author: alexwjj
 * @Date: 2020-09-28 21:45:10
 * @LastEditors: alexwjj
 * @LastEditTime: 2021-02-06 22:54:23
 */
import { CategoryModel } from './../pages/category/Model';
import { message } from 'antd';
import jsonp from 'jsonp';
import ajax from './ajax';
import { ResponseValue } from './Model';
import { ReqMethodEnum } from './ReqMethodEnum';
import { PageSplitModel } from './Model';
import { ProductsModel } from '../pages/product/Model';
import { BASE_URL } from '../utils/Constants';
import { RoleModel } from '../pages/role/Model';
import { UserModel } from '../pages/user/model';

/**
 * @name: reqLogin
 * @test: test font
 * @msg: 登录接口
 * @param {string} name
 * @param {string} password
 * @return {*}
 */
export const reqLogin = (name: string, password: string): Promise<ResponseValue<UserModel>> =>
	ajax<ResponseValue<UserModel>>('/api/user/login', { name, password }, ReqMethodEnum.POST);

/**
 * @name: reqAddUser
 * @test: test font
 * @msg: 添加用户
 * @param {any} user
 * @return {*}
 */
export const reqAddUser = (user: UserModel): Promise<string> => ajax<string>('/api/user/add', user, ReqMethodEnum.POST);

export const reqWheater = (city: string): Promise<{ dayPictureUrl: any; weather: any }> => {
	return new Promise((resolve, reject) => {
		jsonp(
			`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
			(err, data: any) => {
				if (!err && data.status === 'success') {
					const { dayPictureUrl, weather } = data.results[0].weather_data[0];
					resolve({ dayPictureUrl, weather });
				} else {
					message.error('获取天气信息失败!');
				}
			}
		);
	});
};

/**
 * @name: reqCategoryById
 * @test: test font
 * @msg: 通过id得到种类
 * @param {string} id
 * @return {  Promise<CategoryModel> }
 */
export const reqCategoryById = (id: string): Promise<CategoryModel> =>
	ajax<CategoryModel>(`/api/category/findCategoryById/${id}`);

/**
 * @name: reqCategorys
 * @test: test font
 * @msg: 得到所有种类
 * @param {string} parentId
 * @return {Promise<ResponseValue<any>}
 */
export const reqCategorys = (parentId: string): Promise<ResponseValue<any>> =>
	ajax<ResponseValue<any>>(`/api/category/list/${parentId}`);

/**
 * @name: reqAddCategory
 * @test: test font
 * @msg: 添加种类
 * @param {string} parentId
 * @param {string} categoryName
 * @param {string} name
 * @return {Promise<ResponseValue<any>>}
 */
export const reqAddCategory = (parentId: string, categoryName: string, name: string): Promise<ResponseValue<any>> =>
	ajax<ResponseValue<any>>('/api/category/add', { parentId, categoryName, name }, ReqMethodEnum.POST);

/**
 * @name: reqUpdateCategory
 * @test: test font
 * @msg: 更新种类
 * @param { id: string,parentId: string,name: string,categoryName: string }
 * @return {Promise<ResponseValue<any>>}
 */
export const reqUpdateCategory = (
	id: string,
	parentId: string,
	name: string,
	categoryName: string
): Promise<ResponseValue<any>> =>
	ajax<ResponseValue<any>>('/api/category/update', { id, parentId, name, categoryName }, ReqMethodEnum.PUT);

/**
 * @name: reqProducts
 * @test: test font
 * @msg: 得到所有产品
 * @param {number} pageNum
 * @param {number} pageSize
 * @return {Promise<PageSplitModel<ProductsModel>}
 */
export const reqProducts = (pageNum: number, pageSize: number): Promise<PageSplitModel<ProductsModel>> =>
	ajax<PageSplitModel<ProductsModel>>('/api/products/list', { pageNum, pageSize }, ReqMethodEnum.POST);

/**
 * @name: reqProductsByDesc
 * @test: test font
 * @msg:根据描述搜索商品
 * @param {desc: string,pageNum: number,pageSize: number}
 * @return {Promise<PageSplitModel<ProductsModel>}
 */
export const reqProductsByDesc = (
	desc: string,
	pageNum: number,
	pageSize: number
): Promise<PageSplitModel<ProductsModel>> =>
	ajax<PageSplitModel<ProductsModel>>(`/api/products/searchByDesc/${desc}/${pageNum}/${pageSize}`, ReqMethodEnum.GET);

/**
 * @name: reqProductsByName
 * @test: test font
 * @msg: 根据名称搜索商品
 * @param {*}
 * @return {*}
 */
export const reqProductsByName = (
	name: string,
	pageNum: number,
	pageSize: number
): Promise<PageSplitModel<ProductsModel>> =>
	ajax<PageSplitModel<ProductsModel>>(
		`/api/products/searchByName`,
		{
			name: name,
			pageNum: pageNum,
			pageSize: pageSize,
		},
		ReqMethodEnum.GET
	);

/**
 * @name: reqUpdateStatus
 * @test: test font
 * @msg: 通过id更新产品状态
 * @param {number} id
 * @param {number} status
 * @return {Promise<number>}
 */
export const reqUpdateStatus = (id: number, status: number): Promise<number> =>
	ajax<number>(`/api/products/updateStatus/${id}`, { status: status }, ReqMethodEnum.PUT);

/**
 * @name: reqUpdateProductsImages
 * @test: test font
 * @msg: 通过id更新图片名称数组
 * @param {number} id
 * @param {string} images
 * @return {Promise<number>}
 */
export const reqUpdateProductsImages = (id: number, images: string[]): Promise<number> =>
	ajax<number>(
		`/api/products/updateImages/${id}`,
		{
			images,
		},
		ReqMethodEnum.PUT
	);

/**
 * @name: reqDeleteProductsImages
 * @test: test font
 * @msg: 删除图片
 * @param {string} fileName
 * @return {Promise<ResponseValue<number>}
 */
export const reqDeleteProductsImages = (fileName: string): Promise<ResponseValue<number>> =>
	ajax<ResponseValue<number>>(`${BASE_URL}/deleteFile/${fileName}`, {}, ReqMethodEnum.DELETE);

/**
 * @name: reqAddProduct
 * @test: test font
 * @msg: 添加产品
 * @param {ProductsModel} product
 * @return {Promise<ResponseValue<number>>}
 */
export const reqAddProduct = (product: ProductsModel): Promise<ResponseValue<number>> =>
	ajax<ResponseValue<number>>(`/api/products/addProduct`, product, ReqMethodEnum.POST);

/**
 * @name: reqUpdateProduct
 * @test: test font
 * @msg: 更新产品
 * @param {number} id
 * @param {ProductsModel} product
 * @return {Promise<ResponseValue<number>>}
 */
export const reqUpdateProduct = (id: number, product: ProductsModel): Promise<ResponseValue<number>> =>
	ajax<ResponseValue<number>>(`/api/products/updateProduct/${id}`, product, ReqMethodEnum.PUT);

/**
 * @name: reqRoles
 * @test: test font
 * @msg: 增加角色
 * @param {}
 * @return {Promise<ResponseValue<RoleModel[]>}
 */
export const reqRoles = (): Promise<ResponseValue<RoleModel[]>> =>
	ajax<ResponseValue<RoleModel[]>>('/api/role/getRoles', {}, ReqMethodEnum.GET);

/**
 * @name: reqCreateRole
 * @test: test font
 * @msg: 创建角色
 * @param {RoleModel} role
 * @return {Promise<String>}
 */
export const reqCreateRole = (role: RoleModel): Promise<string> =>
	ajax('/api/role/createRole', role, ReqMethodEnum.POST);

/**
 * @name: reqCreateRoleByName
 * @test: test font
 * @msg: 通过角色名创建角色
 * @param {string} name
 * @return {Promise<string>}
 */
export const reqCreateRoleByName = (name: string): Promise<string> =>
	ajax<string>('/api/role/createRoleByName', name, ReqMethodEnum.POST);

/**
 * @name: reqUpdateRole
 * @test: test font
 * @msg: 根据更新用户
 * @param {string} id
 * @param {RoleModel} role
 * @return {*}
 */
export const reqUpdateRole = (id: number, role: RoleModel): Promise<string> =>
	ajax<string>(`/api/role/updateRole/${id}`, role, ReqMethodEnum.PUT);

/**
 * @name: reqUsers
 * @test: test font
 * @msg: 查询所有用户
 * @param {}
 * @return {Promise<UserModel[]>}
 */
export const reqUsers = (): Promise<UserModel[]> => ajax<UserModel[]>('/api/user/getUsers', {}, ReqMethodEnum.GET);

/**
 * @name: reqUpdateUser
 * @test: test font
 * @msg:  更新用户
 * @param {UserModel} user
 * @return {string}
 */
export const reqUpdateUser = (user: UserModel): Promise<string> =>
	ajax<string>(`/api/user/update/${user.id}`, user, ReqMethodEnum.PUT);

/**
 * @name: reqDeleteUser
 * @test: test font
 * @msg: 根据id删除用户
 * @param {number} id
 * @return {*}
 */
export const reqDeleteUser = (id: number): Promise<string> =>
	ajax<string>(`/api/user/delete/${id}`, {}, ReqMethodEnum.DELETE);

/**
 * @name: reqRoleById
 * @test: test font
 * @msg: 根据id请求角色
 * @param {string} id
 * @return {role}
 */
export const reqRoleById = (id: string): Promise<RoleModel> =>
	ajax<RoleModel>(`/api/role/get/${id}`, {}, ReqMethodEnum.GET);
