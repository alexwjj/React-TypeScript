import { ReqMethodEnum } from './ReqMethodEnum';
/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-09-28 21:45:10
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-23 21:57:33
 */
import { message } from 'antd';
import Axios from 'axios';

export default function ajax<T>(url: string, data: {} = {}, method: ReqMethodEnum = ReqMethodEnum.GET): Promise<T> {
	return new Promise((resolve, rejects) => {
		const headers = {
			'content-Type': 'application/json;charset=UTF-8',
		};
		let promise: Promise<T>;
		switch (method) {
			case ReqMethodEnum.GET:
				promise = Axios.get(url, { params: data, headers: headers });
				break;
			case ReqMethodEnum.POST:
				promise = Axios.post(url, data, { headers });
				break;
			case ReqMethodEnum.PUT:
				promise = Axios.put(url, data, { headers });
				break;
			case ReqMethodEnum.DELETE:
				promise = Axios.delete(url, { data, headers });
				break;
			default:
				promise = Axios.get(url, { params: data, headers });
				break;
    }
    promise
    .then((response: any) => {
      resolve(response.data);
    })
    .catch((error) => {
      message.error('请求出错：' + error.message);
    });

	});
}
