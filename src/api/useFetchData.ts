import { message } from 'antd';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { ReqMethodEnum } from './ReqMethodEnum';

/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-01-23 21:42:50
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-30 22:16:52
 */

interface FetChDataModel {
	url: string;
	requestType: ReqMethodEnum;
	params: {};
}

const headers = {
	'content-Type': 'application/json;charset=UTF-8',
};

export default function useHackerNewsApi<T>() {
	const [data, setData] = useState({ hits: [] });
	const [reqData, setUrl] = useState<FetChDataModel | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (reqData !== null) {
			const fetchData = async () => {
				setIsError(false);
				setIsLoading(true);
				const url = reqData?.url;
				let promise: Promise<T>;
				switch (reqData?.requestType) {
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
						setData(response.data);
						setIsLoading(false);
					})
					.catch((error) => {
						message.error('请求出错：' + error.message);
						setIsError(true);
					});
			};
			fetchData();
		}
	}, [reqData?.url]);

	const doFetch = (data: FetChDataModel) => {
		setUrl(data);
	};

	return { data, isLoading, isError, doFetch };
}
