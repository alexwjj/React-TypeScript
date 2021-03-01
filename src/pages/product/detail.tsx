import { Card, List } from 'antd';
import React, { Component } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router';
import LinkButton from '../../components/link-button';
import { reqCategoryById } from '../../api';
import MemoryUtils from '../../utils/MemoryUtils';

interface ProductDetailState {
	cName: string;
	pName: string;
}

interface ProductDetailProps {}

type ProductDetailRoutePros = ProductDetailProps & RouteComponentProps;

class ProductDetail extends Component<ProductDetailRoutePros, ProductDetailState> {
	constructor(props: ProductDetailRoutePros) {
		super(props);

		this.state = {
			cName: '',
			pName: '',
		};
	}

	componentDidMount() {
		this.getCategoryName();
	}

	private async getCategoryName() {
		const { categoryId, pcategoryId } = MemoryUtils.product??{};
		if (pcategoryId === '0') {
			const cResult = await reqCategoryById(categoryId??'');
			this.setState({
				cName: cResult.name,
			});
		} else {
			Promise.all([reqCategoryById(categoryId??''), reqCategoryById(pcategoryId??'')]).then((value) => {
				this.setState({
					cName: value[0].name,
					pName: value[1].name,
				});
			});
		}
	}

	render() {
   
		const  { desc, detail, images, price, name } = MemoryUtils.product??{};
		const { cName, pName } = this.state;
		const imageList: string[] = images?.split(',') ?? [];
		const title = (
			<span>
				<LinkButton
					onClick={() => {
						this.props.history.goBack();
					}}
				>
					<ArrowLeftOutlined style={{ marginRight: '5px' }} />
				</LinkButton>
				<span>商品详情</span>
			</span>
		);

		return (
			<div>
				<Card title={title} className="product-detail">
					<List className="list">
						<List.Item className="item">
							<span className="left">商品名称:</span>
							<span className="right">{name}</span>
						</List.Item>
						<List.Item className="item">
							<span className="left">商品描述:</span>
							<span>{desc}</span>
						</List.Item>
						<List.Item className="item">
							<span className="left">商品价格:</span>
							<span>{price}</span>
						</List.Item>
						<List.Item className="item">
							<span className="left">所属分类:</span>
							<span>
								{pName === '' ? '' : `${pName}-->`}
								{cName}
							</span>
						</List.Item>
						<List.Item className="item">
							<span className="left">商品图片:</span>
							<span>
								{imageList.map((img) => {
									return (
										<img key={img} className="product-img" src={`http://localhost:5000/files/${img}`} alt="img"></img>
									);
								})}
							</span>
						</List.Item>
						<List.Item className="item">
							<span className="left">商品详情:</span>
							<span dangerouslySetInnerHTML={{ __html: detail??"" }}></span>
						</List.Item>
					</List>
				</Card>
			</div>
		);
	}
}

export default withRouter(ProductDetail);
