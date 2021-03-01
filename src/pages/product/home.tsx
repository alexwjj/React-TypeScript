import { Button, Card, Input, message, Select, Table } from 'antd';
import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqProducts, reqProductsByDesc, reqProductsByName, reqUpdateStatus } from '../../api';
import { ProductsModel } from './Model';
import { PageSplitModel } from '../../api/Model';
import { PAGE_SIZE } from '../../utils/Constants';
import { RouteComponentProps, withRouter } from 'react-router';
import MemoryUtils from '../../utils/MemoryUtils';
/**
 * product的默认子路由组件
 */

interface ProductHomeState {
	products: ProductsModel[] | undefined;
	total: number;
	loading: boolean;
	searchInfo: string;
	searchType: string;
	pageNum: number;
}

interface ProductHomeProps {}

type ProductHomeRouteProps = ProductHomeProps & RouteComponentProps;
class ProductHome extends Component<ProductHomeRouteProps, ProductHomeState> {
	private columns: any[] = [];
	private pageNum: number = 1;
	constructor(props: ProductHomeRouteProps) {
		super(props);
		this.state = {
			products: [],
			total: 0,
			loading: false,
			searchInfo: '',
			searchType: 'searchByName',
			pageNum: 1,
		};

		this.initColumns();
	}

	private showDetails = (product: ProductsModel): void => {
		MemoryUtils.product = product;
		this.props.history.push('/product/detail');
	};

	private showUpdate = (product: ProductsModel) => {
		MemoryUtils.product = product;
		this.props.history.push('/product/add');
	};
	/**
	 * @name: 初始化表头
	 * @test: test font
	 * @msg:
	 * @param {*}
	 * @return {*}
	 */
	private initColumns = (): void => {
		this.columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
			},
			{
				title: '商品描述',
				dataIndex: 'desc',
			},
			{
				title: '价格',
				dataIndex: 'price',
				render: (price: any) => {
					return '￥' + price;
				},
			},
			{
				title: '状态',
				render: (product: ProductsModel) => {
					const { status, id } = product;
					return (
						<span>
							<Button
								type="primary"
								onClick={() => {
									if (id === undefined) {
										message.error('id为空');
										return;
									}
									this.updateStatus(id, status === 1 ? 2 : 1);
								}}
							>
								{status === 1 ? '下架' : '上架'}
							</Button>
							<span>{status === 1 ? '在售' : '已下架'}</span>
						</span>
					);
				},
			},
			{
				title: '操作',
				render: (product: ProductsModel) => {
					return (
						<span>
							<LinkButton
								onClick={() => {
									this.showDetails(product);
								}}
							>
								详情
							</LinkButton>
							<LinkButton
								onClick={() => {
									this.showUpdate(product);
								}}
							>
								修改
							</LinkButton>
						</span>
					);
				},
			},
		];
	};

	private updateStatus = async (id: number, status: number) => {
		const result = await reqUpdateStatus(id, status);
		if (result === 1) {
			this.getDataSources(this.pageNum);
		}
	};

	componentDidMount() {
		this.getDataSources(1);
	}

	private getDataSources = async (pageNum: number) => {
		this.pageNum = pageNum;
		this.setState({ loading: true });
		let result: PageSplitModel<ProductsModel>;
		if (this.state.searchInfo !== '') {
			result = await this.searchByNameOrDesc(pageNum);
		} else {
			result = await reqProducts(pageNum, PAGE_SIZE);
		}
		this.setState(() => {
			return {
				products: result.list,
				total: result.total,
				loading: false,
				pageNum: pageNum,
			};
		});
	};

	private searchByNameOrDesc = (pageNum: number): Promise<PageSplitModel<ProductsModel>> => {
		const { searchType, searchInfo } = this.state;
		if (searchType === 'searchByName') {
			return reqProductsByName(searchInfo, pageNum, PAGE_SIZE);
		} else {
			return reqProductsByDesc(searchInfo, pageNum, PAGE_SIZE);
		}
	};

	render() {
		const { products, total, loading, searchType, searchInfo, pageNum } = this.state;
		const title = (
			<span>
				<Select value={searchType} style={{ width: 150 }} onChange={(value) => this.setState({ searchType: value })}>
					<Select.Option value="searchByName">按名称搜索</Select.Option>
					<Select.Option value="searchByDesc">按描述搜索</Select.Option>
				</Select>
				<Input
					placeholder="关键字"
					style={{ width: 150, margin: '0 15px' }}
					value={searchInfo}
					onChange={(e) => this.setState({ searchInfo: e.target.value })}
				></Input>
				<Button
					type="primary"
					onClick={() => {
						this.getDataSources(1);
					}}
				>
					搜索
				</Button>
			</span>
		);
		const extra = (
			<Button
				type="primary"
				icon={<PlusOutlined />}
				onClick={() => {
					this.props.history.push('/product/add');
				}}
			>
				添加商品
			</Button>
		);
		return (
			<Card title={title} extra={extra}>
				<Table
					loading={loading}
					rowKey="idStr"
					bordered
					dataSource={products}
					columns={this.columns}
					pagination={{
						defaultPageSize: PAGE_SIZE,
						total,
						showQuickJumper: true,
						onChange: this.getDataSources,
						current: pageNum,
					}}
				/>
			</Card>
		);
	}
}

export default withRouter(ProductHome);
