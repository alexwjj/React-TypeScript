import { Select, Form, Input, Modal, message } from 'antd';
import React, { Component } from 'react';
import { reqAddCategory } from '../../api';
import { ICategory } from './Model';
import { ModalStatusCode } from './ModalStatusCode';

const Option = Select.Option;
const Item = Form.Item;

interface Values {
	title?: string;
	value?: string;
}

interface IAddFormProps {
	category: ICategory;
	onCancel: () => void;
	showStatus: ModalStatusCode;
	categorys: ICategory[];
	updateCategory: (category:ICategory) => void;
}
export default class AddForm extends Component<IAddFormProps, {}> {
	private onCancel = (): void => {
		this.props.onCancel();
	};

	private CreateModalFrom = (): any => {
		const [form] = Form.useForm();
		const { categorys, updateCategory,category } = this.props;
		return (
			<Modal
				destroyOnClose={true}
				visible={ModalStatusCode.Add === this.props.showStatus}
				title={'添加分类'}
				okText="Ok"
				cancelText="Cancel"
				onCancel={this.onCancel}
				onOk={() => {
					form
						.validateFields()
						.then(async (values: Values) => {
							console.log(values);
							if (values.value === undefined || values.title === undefined) {
								message.error('参数错误');
								return;
							}
							const result = await reqAddCategory(values.value, values.value === '0' ? '一级分类' : categorys[Number.parseInt(values.value) - 1].categoryName, values.title);
							if (result.status === 0) {
								message.info('添加成功');
								updateCategory(category);
							} else {
								message.error('添加失败');
							}
							this.onCancel();
						})
						.catch((info) => {
							console.log('Validate Failed:', info);
						});
				}}
			>
				<Form form={form} preserve={false}>
					{this.addFromElement()}
				</Form>
			</Modal>
		);
	};

	private addFromElement(): React.ReactNode {
		const { categorys,category} = this.props;
		return (
			<div>
				<Item label="分类名称" required name="value" initialValue={categorys[0]?.parentId === '' ? '0' : categorys[0]?.parentId}>
					<Select style={{ width: '100%' }}>
    {category._id === '' ? <Option value="0">一级分类</Option> : <Option value={category._id}>{category.name}</Option>}
						{this.props.categorys.map((item: ICategory) => {
							return (
								<Option key={item._id} value={item._id}>
									{item.name}
								</Option>
							);
						})}
					</Select>
				</Item>
				<Item label="品类名称" required name="title" rules={[{ required: true, message: '请输入分类名称' }]}>
					<Input placeholder="请输入分类名称"></Input>
				</Item>
			</div>
		);
	}

	render() {
		return (
			<div>
				<this.CreateModalFrom />
			</div>
		);
	}
}
