/*
 * @Descripttion:
 * @version:
 * @Author: alexwjj
 * @Date: 2020-10-14 21:16:42
 * @LastEditors: alexwjj
 * @LastEditTime: 2021-01-23 23:57:31
 */
export interface MenuConfig {
	title: string;
	key: string;
	icon: string;
	isPublic?: boolean;
	children?: MenuConfig[];
}

export const menuList: MenuConfig[] = [
	{
		title: '首页',
		key: '/home',
		icon: 'HomeOutlined',
		isPublic: true,
	},
	// {
	// 	title: '门诊工作站',
	// 	key: '/clinic',
	// 	icon: 'HomeOutlined',
	// 	isPublic: true,
	// },
	// {
	// 	title: '挂号登记',
	// 	key: '/register',
	// 	icon: 'AppstoreOutlined',
	// 	children: [
	// 		{
	// 			title: '挂号记录',
	// 			key: '/record',
	// 			icon: 'ToolOutlined',
	// 		},
	// 		{
	// 			title: '新建挂号',
	// 			key: '/add-register',
	// 			icon: 'ToolOutlined',
	// 		},
	// 	],
	// },
	// {
	// 	title: '收费管理',
	// 	key: '/charge',
	// 	icon: 'AppstoreOutlined',
	// 	children: [
	// 		{
	// 			title: '收费管理',
	// 			key: '/charge-manage',
	// 			icon: 'ToolOutlined',
	// 		},
	// 		{
	// 			title: '结算记录',
	// 			key: '/settle-record',
	// 			icon: 'ToolOutlined',
	// 		},
	// 		{
	// 			title: '处方详情',
	// 			key: '/prescription-detail',
	// 			icon: 'ToolOutlined',
	// 		},
	// 	],
	// },
	{
		title: 'Demo',
		key: '/demo',
		icon: 'HomeOutlined',
		isPublic: true,
	},
	{
		title: 'Demo-Hooks',
		key: '/demo-hooks',
		icon: 'HomeOutlined',
		isPublic: true,
	},
	// {
	// 	title: '商品',
	// 	key: '/products',
	// 	icon: 'AppstoreOutlined',
	// 	children: [
	// 		{
	// 			title: '品类管理',
	// 			key: '/category',
	// 			icon: 'ToolOutlined',
	// 		},
	// 		{
	// 			title: '商品管理',
	// 			key: '/product',
	// 			icon: 'ToolOutlined',
	// 		},
	// 	],
	// },
	// {
	// 	title: '用户管理',
	// 	key: '/user',
	// 	icon: 'UserOutlined',
	// },
	// {
	// 	title: '角色管理',
	// 	key: '/role',
	// 	icon: 'SafetyOutlined',
	// },
	// {
	// 	title: '图形图表',
	// 	key: '/charts',
	// 	icon: 'AreaChartOutlined',
	// 	children: [
	// 		{
	// 			title: '柱形图',
	// 			key: '/bar',
	// 			icon: 'BarsOutlined',
	// 		},
	// 		{
	// 			title: '折线图',
	// 			key: '/line',
	// 			icon: 'LineChartOutlined',
	// 		},
	// 		{
	// 			title: '饼图',
	// 			key: '/pie',
	// 			icon: 'PieChartOutlined',
	// 		},
	// 	],
	// },
];
