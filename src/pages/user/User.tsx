/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-10-14 21:16:42
 * @LastEditors: MFine
 * @LastEditTime: 2021-02-04 16:20:43
 */
import ProForm, { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Button, Card, message, Space, Table } from 'antd';
import React, {  useEffect, useState } from 'react';
import { reqAddUser, reqDeleteUser, reqRoles, reqUpdateUser, reqUsers } from '../../api';
import { UserModel } from './model';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import WrappedProFormText from '@ant-design/pro-form/lib/components/Text';
import { RoleModel } from '../role/Model';
import {logout} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';


const User = () => {
	const [users, setUsers] = useState<UserModel[]>([]);
	const [roles, setRoles] = useState<RoleModel[]>([]);
	const [user, setUser] = useState<UserModel>();
	const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const dispath =useDispatch();
  const loginUser = useSelector((state:RootState)=>state.user);
	const columns = [
		{
			title: '用户名',
			dataIndex: 'name',
		},
		{
			title: '邮箱',
			dataIndex: 'email',
		},
		{
			title: '电话',
			dataIndex: 'phone',
		},
		{
			title: '注册时间',
			dataIndex: 'createTime',
		},
		{
			title: '所属角色',
			dataIndex: 'roleId',
			render: (roleId: string) => roles.find((r) => r.id?.toString() === roleId)?.name,
		},
		{
			title: '操作',
			dataIndex: 'action',
			render: (text: any, record: UserModel) => (
				<Space size="middle">
					<ModalForm
						layout="horizontal"
						title="修改用户"
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 14 }}
						trigger={<span style={{ color: '#4FC08D', cursor: 'pointer' }}>修改</span>}
						modalProps={{
							onCancel: () => console.log(text, record),
							afterClose: () => {
								if (user?.name === loginUser.name) {
									dispath(logout());
								}
							},
						}}
						onFinish={async (values: Record<string, UserModel>): Promise<boolean> => {
							Object.assign(record, values);
							const result: string = await reqUpdateUser(record);
							if (result === 'success') {
								message.success('修改成功');
								setUser(record);
							} else {
								message.error('修改失败');
							}
							return true;
						}}
					>
						{proForm(record)}
					</ModalForm>
					<ModalForm
						layout="horizontal"
						title="删除用户"
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 14 }}
						trigger={<span style={{ color: 'red', cursor: 'pointer' }}>删除</span>}
						modalProps={
							{
								// onCancel: () => console.log(text, record),
							}
						}
						onFinish={async (values: Record<string, UserModel>): Promise<boolean> => {
							if (record.id) {
								const result: string = await reqDeleteUser(record.id);
								if (result === 'success') {
									setUser(record);
									message.success('删除成功');
								} else {
									message.error('删除失败');
								}
							}
							return true;
						}}
					>
						<span style={{ color: 'red', textAlign: 'center' }}>确定要删除此用户吗</span>
					</ModalForm>
				</Space>
			),
		},
	];

	useEffect(() => {
		let ignore: boolean = false;
		const fetchData = async () => {
			const users = await reqUsers();
			const roles = (await reqRoles()).data;
			if (!ignore) {
				setRoles(roles ?? []);
				setUsers(users);
			}
		};
		fetchData();
		return () => {
			ignore = true;
			setIsUpdate(false);
		};
	}, [isUpdate, user]);

	const proForm = (user?: UserModel): React.ReactElement => {
		return (
			<ProForm.Group>
				<ProFormText
					rules={[{ required: true, message: '请输入用户名!' }]}
					name="name"
					label="用户名"
					width="lg"
					placeholder="用户名"
					initialValue={user?.name ?? ''}
				></ProFormText>
				{user === undefined ? (
					<WrappedProFormText.Password
						rules={[{ required: true, message: '请输入密码!' }]}
						name="password"
						label="密码"
						width="lg"
						placeholder="密码"
						fieldProps={{
							type: 'password',
							iconRender: (visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />),
						}}
					></WrappedProFormText.Password>
				) : (
					<WrappedProFormText.Password
						rules={[{ required: true, message: '请输入密码!' }]}
						name="password"
						label="密码"
						width="lg"
						placeholder="密码"
						initialValue={user?.password}
						fieldProps={{
							type: 'password',
							iconRender: (visible = false) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />),
						}}
					></WrappedProFormText.Password>
				)}
				<ProFormText
					rules={[{ required: true, message: '请输入手机号!' }]}
					name="phone"
					label="手机号"
					width="lg"
					placeholder="手机号"
					initialValue={user?.phone ?? ''}
				></ProFormText>
				<ProFormText
					rules={[{ required: true, message: '请输入邮箱!' }]}
					name="email"
					label="邮箱"
					width="lg"
					placeholder="邮箱"
					initialValue={user?.email ?? ''}
				></ProFormText>
				<ProForm.Group>
					<ProFormSelect
						width="lg"
						request={async () => {
							return roles.reduce((acc: { label?: string; value?: string }[], curValue: RoleModel): {
								label?: string;
								value?: string;
							}[] => {
								acc.push({ label: curValue.name.toString(), value: curValue.id?.toString() });
								return acc;
							}, []);
						}}
						initialValue={user === undefined ? null : roles.find((r) => r.id?.toString() === user.roleId)?.name}
						label="角色"
						name="roleId"
					/>
				</ProForm.Group>
			</ProForm.Group>
		);
	};

	const title = (
		<span className="user">
			<ModalForm
				layout="horizontal"
				title="添加用户"
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				trigger={<Button type="primary">创建角色</Button>}
				modalProps={{
					onCancel: () => console.log('run1'),
				}}
				onFinish={async (values: Record<string, UserModel>): Promise<boolean> => {
					const result = await reqAddUser(values);
					if (result === 'success') {
						message.success('添加用户成功');
						users.push(values);
						setIsUpdate(true);
					} else {
						message.error('添加用户失败');
					}
					return true;
				}}
			>
				{proForm()}
			</ModalForm>
		</span>
	);

	return (
		<div className="user">
			<Card title={title}>
				<Table rowKey="id" columns={columns} dataSource={users}></Table>
			</Card>
		</div>
	);
};

export default User;
