/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-11-30 22:46:31
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-22 21:38:27
 */
import ajax from '../../api/ajax';
import { PageSplitModel, ResponseValue } from '../../api/Model';
import { ReqMethodEnum } from '../../api/ReqMethodEnum';
import { CategoryModel } from '../../pages/category/Model';
import { ProductsModel } from '../../pages/product/Model';
import { BASE_URL } from '../../utils/Constants';

describe('test api', () => {
  
	test('test reqByProductsByName', async () => {
		const result = await ajax<PageSplitModel<ProductsModel>>('http://localhost:5000/api/products/searchByName', {
			name: '8',
			pageNum: 1,
			pageSize: 3,
		});
		if (result.total === 0) {
			expect(result.list?.length).toEqual(0);
		} else {
			expect(result.list?.length).toBeGreaterThan(0);
		}
  });
  
	test('test reqCategoryById ', async () => {
		const result = await ajax<CategoryModel>('http://localhost:5000/api/category/findCategoryById/5');
		expect(result.name).toEqual('手机');
	});

	test('update product images', async () => {
		const data = await ajax<ProductsModel>(BASE_URL + '/api/products/findById/1', ReqMethodEnum.GET);
		const result = await ajax<ResponseValue<number>>(BASE_URL + '/api/products/updateImages/1',{
			images: data.images.split(",")
		},ReqMethodEnum.PUT);
		expect(result.data).toEqual(1);
  });
  
  test('test delete images',async ()=>{
    const result = await ajax<ResponseValue<number>>(BASE_URL+"/deleteFile/imag.jpg",ReqMethodEnum.DELETE);
    console.log(result);
  })
});
