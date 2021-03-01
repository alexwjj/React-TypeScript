/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑       永不宕机     永无BUG
 *
 *        佛曰:
 *                写字楼里写字间，写字间里程序员；
 *                程序人员写程序，又拿程序换酒钱。
 *                酒醒只在网上坐，酒醉还来网下眠；
 *                酒醉酒醒日复日，网上网下年复年。
 *                但愿老死电脑间，不愿鞠躬老板前；
 *                奔驰宝马贵者趣，公交自行程序员。
 *                别人笑我忒疯癫，我笑自己命太贱；
 *                不见满街漂亮妹，哪个归得程序员？
 */

/*
 * @Descripttion:
 * @version:
 * @Author: alexwjj
 * @Date: 2020-10-14 21:16:42
 * @LastEditors: alexwjj
 * @LastEditTime: 2020-11-02 17:38:13
 */

import { Button, Card, message, Table } from 'antd';
import React, { Component } from 'react';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqCategorys } from '../../api';
import { ModalStatusCode } from './ModalStatusCode';
import { CategoryModel, ICategory } from './Model';
import UpdateFrom from './UpdateFrom';
import AddForm from './AddForm';

interface ICategoryProps {}

interface ICategoryState {
	categorys: ICategory[];
	loading: boolean;
	parentId: string;
	parentName: string;
	showStatus: number;
}


export default class Category extends Component<ICategoryProps, ICategoryState> {
	private columns: any[] = [];
	private defaultCategory: ICategory = {
		parentId: '',
		_id: '',
		name: '',
		__v: 0,
		categoryName: '',
		parentName: '',
	};
	constructor(props: ICategoryProps) {
		super(props);
		this.initColumns();
		this.state = {
			loading: false,
			categorys: [],
			parentId: '0',
			parentName: '',
			showStatus: 0,
		};
	}

	componentDidMount() {
		const { parentId } = this.state;
		this.getCategory(parentId);
	}

	private getCategory = async (parentId: string) => {
		this.setLoading(true);
		const result: any = await reqCategorys(parentId);
		this.setLoading(false);
		if (result.status !== 0) {
			message.error('获取分类列表失败');
			return;
		} else {
			this.setCategorys(result);
		}
	};

	private setLoading = (isLoading: boolean): void => {
		this.setState(() => {
			return {
				loading: isLoading,
			};
		});
	};

	private setCategorys = (result: any): void => {
		let categorys: ICategory[] = result.data.map((item: CategoryModel) => {
			let tmp: ICategory = { parentId: item.parentId, _id: String(item.id), __v: 0, name: item.name, categoryName: item.categoryName, parentName: item.parentName };
			return tmp;
		});
		this.setState(() => {
			return {
				categorys: categorys,
			};
		});
	};

	/**
	 * @name: 显示二级列表
	 * @test:
	 * @msg:
	 * @param {category: ICategory)}
	 * @return {void}
	 */
	private showSubCategorys = (category: ICategory): void => {
    this.defaultCategory = category;
		this.setState(
			() => {
				return {
					parentId: category._id,
					parentName: category.name,
				};
			},
			() => {
				this.getCategory(this.state.parentId);
			}
		);
	};

	/**
	 * @name: 显示一级列表
	 * @test: test font
	 * @msg:
	 * @return {type}
	 */
	private showCategorys = (category:ICategory=this.defaultCategory): void => {
    if (category._id==='') {
      this.setState(
        () => {
          return { parentId: '0', parentName: '' };
        },
        () => {
          this.getCategory(this.state.parentId);
        }
      );
    }else{
      this.showSubCategorys(category);
    }
	};

	/**
	 * @name: 点击退出模态框
	 * @test: test font
	 * @msg:
	 * @param {type}
	 * @return {type}
	 */
	private handleCancel = (): void => {
		this.showModalWithMutiForm(ModalStatusCode.Invisble);
	};

	/**
	 * @name: 显示模态框
	 * @test: test font
	 * @msg:
	 * @param {type}
	 * @return {type}
	 */
	private showModalWithMutiForm = (status: number = ModalStatusCode.Add): void => {
		this.setState({
			showStatus: status,
		});
	};

	private showUpdateCategory = (category: ICategory): void => {
		this.defaultCategory = category;
		this.showModalWithMutiForm(ModalStatusCode.Update);
	};

	/**
	 * @name: 初始化表头
	 * @test: test font
	 * @msg:
	 * @return void
	 */
	private initColumns = (): void => {
		this.columns = [
			{
				title: '分类名称',
				dataIndex: 'name',
			},
			{
				title: '操作',
				width: 300,
				render: (category: ICategory) => (
					<span>
						<LinkButton onClick={() => this.showUpdateCategory(category)}>修改分类</LinkButton>
						{this.state.parentId === '0' ? (
							<LinkButton
								onClick={() => {
									this.showCategorys(category);
								}}
							>
								查看子分类
							</LinkButton>
						) : null}
					</span>
				),
			},
		];
	};

	render() {
		const { categorys, loading, parentName, parentId } = this.state;
		const title: any =
			parentId === '0' ? (
				'一级分类列表'
			) : (
				<span>
					<LinkButton onClick={this.showCategorys.bind(this)}>一级分类列表</LinkButton>
					<ArrowRightOutlined style={{ marginRight: '5px' }} />
					<span>{parentName}</span>
				</span>
			);
		const extra: React.ReactNode = (
			<Button
				type="primary"
				icon={<PlusOutlined />}
				onClick={() => {
					this.showModalWithMutiForm(ModalStatusCode.Add);
				}}
			>
				添加
			</Button>
		);
		return (
			<Card title={title} extra={extra}>
				<Table rowKey="_id" dataSource={categorys} columns={this.columns} bordered loading={loading} pagination={{ defaultPageSize: 10, showQuickJumper: true }} />
				<AddForm category={this.defaultCategory} showStatus={this.state.showStatus} categorys={this.state.categorys} onCancel={this.handleCancel} updateCategory={this.showCategorys}></AddForm>
				<UpdateFrom category={this.defaultCategory} showStatus={this.state.showStatus} onCancel={this.handleCancel} updateCategory={this.showCategorys}></UpdateFrom>
			</Card>
		);
	}
}
