import { Form, Input, message, Modal } from 'antd';
import React, { Component } from 'react';
import { reqUpdateCategory } from '../../api';
import { ResponseValue } from '../../api/Model';
import { ICategory } from './Model';
import { ModalStatusCode } from './ModalStatusCode';

interface IUpdateFormProps {
	category: ICategory;
	showStatus: ModalStatusCode;
	onCancel: () => void;
	updateCategory: (category:ICategory) => void;
}

interface IUpdateFormState {
	name: string | null;
	status: ModalStatusCode;
}

interface Values {
	title?: string;
	value?: string;
}

export default class UpdateFrom extends Component<IUpdateFormProps, IUpdateFormState> {
	private onCancel = (): void => {
		this.props.onCancel();
	};

	private CreateModalFrom = (): any => {
		const [form] = Form.useForm();
		const { category, updateCategory } = this.props;
		return (
			<Modal
				destroyOnClose={true}
				visible={ModalStatusCode.Update === this.props.showStatus}
				title={'更新分类'}
				okText="Ok"
				cancelText="Cancel"
				onCancel={this.onCancel}
				onOk={() => {
					form
						.validateFields()
						.then(async (values: Values) => {
							const result: ResponseValue<any> = await reqUpdateCategory(category._id, category.parentId, values.title ?? ' ', category.categoryName);
							if (result.status === 0) {
								message.info('品类更新成功');
								//更新列表
								updateCategory(category);
							} else {
								message.error('品类更新失败');
							}
							this.onCancel();
						})
						.catch((info) => {
							console.log('Validate Failed:', info);
						});
				}}
			>
				<Form form={form} preserve={false}>
					<Form.Item name="title" rules={[{ required: true, message: '请输入品类名称' }]} initialValue={this.props.category.name}>
						{<Input placeholder="请输入分类名称" title="更新分类"></Input>}
					</Form.Item>
				</Form>
			</Modal>
		);
	};

	render() {
		return (
			<div>
				<this.CreateModalFrom />
			</div>
		);
	}
}
