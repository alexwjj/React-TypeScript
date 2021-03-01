/*
 * @Descripttion: 
 * @version: 
 * @Author: MFine
 * @Date: 2020-10-01 19:15:01
 * @LastEditors: MFine
 * @LastEditTime: 2021-02-07 13:42:36
 */
import React, { useState } from 'react';
import { Card, Button } from 'antd';
import ReactEcharts from 'echarts-for-react';

/*
后台管理的柱状图路由组件
 */
const Line = () => {
	const [sales, setSales] = useState<number[]>([5, 20, 36, 10, 10, 20]);
	const [stores, setStore] = useState<number[]>([6, 10, 25, 20, 15, 10]);

	const update = () => {
		setSales(sales.map((e) => e + 1));
		setStore(stores.map((e) => e - 1));
	};

	/*
  返回柱状图的配置对象
   */
	const getOption = (sales: any, stores: any) => {
		return {
			title: {
				text: 'ECharts 入门示例',
			},
			tooltip: {},
			legend: {
				data: ['销量', '库存'],
			},
			xAxis: {
				data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
			},
			yAxis: {},
			series: [
				{
					name: '销量',
					type: 'line',
					data: sales,
				},
				{
					name: '库存',
					type: 'line',
					data: stores,
				},
			],
		};
	};

	return (
		<div>
			<Card>
				<Button type="primary" onClick={update}>
					更新
				</Button>
			</Card>

			<Card title="折线图一">
				<ReactEcharts option={getOption(sales, stores)} />
			</Card>
		</div>
	);
};
export default Line;