import React, { Component, RefObject } from 'react';
import LinkButton from '../../components/link-button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Cascader, Form, Input, message } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import { RuleObject } from 'antd/lib/form';
import { StoreValue } from 'antd/lib/form/interface';
import { CascaderOptionType, CascaderValueType } from 'antd/lib/cascader';
import { CategoryModel } from '../category/Model';
import { reqAddProduct, reqCategorys, reqUpdateProduct } from '../../api';
import { ResponseValue } from '../../api/Model';
import { ProductsModel } from './Model';
import PicturesWall from './pictures-wall';
import RichTextEditor from './rich-text-editor';
import MemoryUtils from '../../utils/MemoryUtils';

interface Options {
	value: string;
	label: string;
	isLeaf: boolean;
	children?: Options[] | undefined;
}

interface ValuesModel {
	category: string[];
	desc: string;
	name: string;
	price: string;
}

interface ProductAddUpdateState {
	options: Options[];
}

interface ProductAddUpdateProps {}

type ProductAddUpdateRouteProps = ProductAddUpdateProps & RouteComponentProps;

const formItemLayout = {
	labelCol: { span: 1 },
	wrapperCol: { span: 8 },
};

const formTailLayout = {
	wrapperCol: { span: 8, offset: 1 },
};
class ProductAddUpdate extends Component<ProductAddUpdateRouteProps, ProductAddUpdateState> {
	isUpdate: boolean = false;
	product: ProductsModel | undefined;
	defaultCategory: string[] = [];
	picturesWallRef: RefObject<PicturesWall>;
	richTextEditorRef: RefObject<RichTextEditor>;
	constructor(props: ProductAddUpdateRouteProps) {
		super(props);
		this.state = {
			options: [],
		};
		const product: undefined | ProductsModel = MemoryUtils.product;
		this.isUpdate = !!product;
		this.product = product;
		this.getCategorys('0');
		this.picturesWallRef = React.createRef();
		this.richTextEditorRef = React.createRef();
	}

	/**
	 * @name: From完成提交回调
	 * @test: test font
	 * @msg:
	 * @param {any}
	 * @return {void}
	 */
	private onFinish = async (values: ValuesModel): Promise<any> => {
		const imagesName: string[] = this.picturesWallRef.current?.getImages() ?? [];
		const rawContent: string = this.richTextEditorRef.current?.getDetail() ?? '';
		let result;
		if (this.product && this.product.id) {
			//更新
			this.product.images = imagesName.join();
			this.product.desc = values.desc;
			this.product.name = values.name;
			this.product.price = values.price;
			this.product.detail = rawContent;
			this.product.categoryId = values.category[1];
			this.product.pcategoryId = values.category[0];
			result = await reqUpdateProduct(this.product.id, this.product);
		} else {
			//新增
			const product: ProductsModel = {
				images: imagesName.join(),
				status: 1,
				name: values.name,
				desc: values.desc,
				detail: rawContent,
				categoryId: values.category[1],
				pcategoryId: values.category[0],
				price: values.price,
				v: 0,
			};
			result = await reqAddProduct(product);
		}
		if (result.status === 0) {
			message.success('更新成功');
		} else {
			message.error('更新失败');
		}
	};

	/**
	 * @name: From提交失败回调
	 * @test: test font
	 * @msg:
	 * @param {*}
	 * @return {*}
	 */
	private onFinishFailed = (errorInfo: any): void => {};

	/**
	 * @name: 价格验证器
	 * @test: test font
	 * @msg: 价格不能小于0
	 * @param { RuleObject , StoreValue}
	 * @return {Promise<any>}
	 */
	private validatePrice = (rule: RuleObject, value: StoreValue): Promise<any> => {
		if (Number.parseInt(value) <= 0) {
			return Promise.reject('价格必须大于0');
		}
		return Promise.resolve();
	};

	/**
	 * @name: Lazy Cascader 数据加载方法
	 * @test: test font
	 * @msg: 用于Lazy Cascader 数据加载
	 * @param { CascaderOptionType[]}
	 * @return {void}
	 */
	private loadData = async (selectedOptions?: CascaderOptionType[]): Promise<any> => {
		if (selectedOptions === undefined) {
			return;
		}
		const targetOption = selectedOptions[0];
		targetOption.loading = true;
		const subCategorys = await this.getCategorys(targetOption.value as string);
		targetOption.loading = false;
		if (subCategorys && subCategorys.length > 0) {
			const childOptions = subCategorys.map((c) => ({
				value: String(c.id),
				label: c.name,
				isLeaf: true,
			}));
			targetOption.children = childOptions;
		} else {
			targetOption.isLeaf = true;
		}
		this.setState({
			options: [...this.state.options],
		});
	};

	private onChange = (value: CascaderValueType, selectedOptions?: CascaderOptionType[]): void => {};

	private getCategorys = async (parentId: string): Promise<CategoryModel[] | undefined> => {
		const result: ResponseValue<CategoryModel[]> = await reqCategorys(parentId);
		if (result.status === 0) {
			const categorys: CategoryModel[] | undefined = result.data;
			if (parentId === '0') {
				this.initOptions(categorys);
			} else {
				return categorys;
			}
		}
	};

	/**
	 * @name: initOptions
	 * @test: test font
	 * @msg: 初始化Cascader状态数据
	 * @param {*}
	 * @return {*}
	 */
	private initOptions = async (categorys: CategoryModel[] | undefined): Promise<any> => {
		const options: Options[] | undefined = categorys?.map((c) => ({
			value: String(c.id),
			label: c.name,
			isLeaf: false,
		}));
		if (options === undefined) {
			return;
		}
		const targetOptions = await this.setCascaderDefaultValue(options);
		this.setState({
			options: targetOptions ?? [],
		});
	};

	componentDidMount() {
		this.getCategorys('0');
	}

	/**
	 * @name: 设置Cascader默认值
	 * @test: test font
	 * @msg: 传入options对option进行判断如果选项父类不为第第一级分类则设置其children
	 * @param { Options[]}
	 * @return {Promise<Options[]>}
	 */
	private async setCascaderDefaultValue(options: Options[]): Promise<Options[]> {
		if (this.product === undefined || options === undefined) {
			return options;
		}
		const { pcategoryId, categoryId } = this.product;
		if (this.isUpdate) {
			if (categoryId !== '0') {
				const subCategorys: CategoryModel[] | undefined = await this.getCategorys(pcategoryId ?? '0');
				const subOptions: Options[] =
					subCategorys?.map((cItem) => ({
						value: String(cItem.id),
						label: cItem.name,
						isLeaf: false,
					})) ?? [];
				const targetOption: Options | undefined = options.find((option) => option.value === pcategoryId);
				if (targetOption !== undefined) {
					targetOption.children = subOptions;
				}
				this.defaultCategory.push(this.product?.pcategoryId ?? '', this.product?.categoryId ?? '');
			} else {
				this.defaultCategory.push(this.product.categoryId);
			}
		}
		return options;
	}
	render() {
		const { options } = this.state;
		const { isUpdate, product } = this;
		const title = (
			<span>
				<LinkButton
					style={{ fontSize: 20 }}
					onClick={() => {
						this.props.history.goBack();
					}}
				>
					<ArrowLeftOutlined style={{ margin: 5 }} />
				</LinkButton>
				<span>{isUpdate ? '修改商品' : '添加商品'}</span>
			</span>
		);
		return (
			<div>
				<Card title={title}>
					<Form
						{...formItemLayout}
						initialValues={{ remember: true }}
						onFinish={this.onFinish}
						className="add-update-from"
						onFinishFailed={this.onFinishFailed}
					>
						<Form.Item
							name="name"
							label="商品名称"
							className="item"
							initialValue={product?.name}
							rules={[{ required: true, message: '必须输入商品名称' }]}
						>
							<Input placeholder="请输入商品名称"></Input>
						</Form.Item>
						<Form.Item
							initialValue={product?.desc}
							name="desc"
							label="商品描述"
							className="item"
							rules={[{ required: true, message: '必须输入商品描述' }]}
						>
							<Input.TextArea placeholder="请输入商品描述" autoSize />
						</Form.Item>
						<Form.Item
							name="price"
							initialValue={product?.price}
							label="商品价格"
							className="item"
							rules={[
								{ required: true, message: '必须输入商品价格' },
								{
									validator: this.validatePrice,
								},
							]}
						>
							<Input type="number" placeholder="请输入商品价格" addonAfter="元"></Input>
						</Form.Item>
						<Form.Item
							name="category"
							label="商品分类"
							className="item"
							initialValue={this.defaultCategory}
							rules={[{ required: true, message: '必须制定商品分类' }]}
						>
							<Cascader
								options={options}
								loadData={this.loadData}
								onChange={this.onChange}
								changeOnSelect
								placeholder="请选择"
							></Cascader>
						</Form.Item>
						<Form.Item label="商品图片" className="item">
							<PicturesWall ref={this.picturesWallRef} images={product?.images ?? ''}></PicturesWall>
						</Form.Item>
						<Form.Item label="商品详情" className="item" labelCol={{ span: 1 }} wrapperCol={{ span: 12 }}>
							<RichTextEditor ref={this.richTextEditorRef} detail={product?.detail ?? ''} />
						</Form.Item>
						<Form.Item {...formTailLayout}>
							<Button type="primary" htmlType="submit">
								提交
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		);
	}
}

export default withRouter(ProductAddUpdate);
