import React, { Component } from 'react';
import './login.less';
import logo from '../../assets/images/logo.png';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { RuleObject } from 'antd/lib/form';
import { StoreValue } from 'antd/lib/form/interface';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { login } from '../../redux/actions';
import { bindActionCreators } from 'redux';
import { LoginUser } from '../../utils/StorageUtils';

/**
 *  登录的路由组件
 *  Author: MFine
 */

type LoginProps = RouteComponentProps & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

class Login extends Component<LoginProps, {}> {
	validatePwd = (rule: RuleObject, value: StoreValue) => {
		if (!value) {
			return Promise.reject('密码必须输入');
		} else if (value.length < 3 || value.length > 12) {
			return Promise.reject('密码长度不能小于4位或大于12位');
		} else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
			return Promise.reject('密码必须是英文，数字和下划线组成');
		} else {
			return Promise.resolve();
		}
	};

	onFinishFailed = (errorInfo: any) => {
		console.log('错了', errorInfo);
	};

	onFinish = (values: { name: string; password: string }) => {
		this.props.login(values.name, values.password);
    message.info("张旭你个傻逼，新年快乐呀")
	};

	private loginFromCom() {
		return (
			<Form
				onFinish={this.onFinish}
				onFinishFailed={this.onFinishFailed}
				name="normal_login"
				className="login-form"
				initialValues={{ remember: true }}
			>
				<Form.Item
					name="name"
					rules={[
						{ required: true, whitespace: true, message: '请输入您的用户名' },
						{ max: 12, message: '用户名最多十二位' },
						{ min: 3, message: '用户名至少三位' },
						{ pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文,数字和下划线组成' },
					]}
				>
					<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
				</Form.Item>
				<Form.Item name="password" rules={[{ validator: this.validatePwd }]}>
					<Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button">
						Log in
					</Button>
				</Form.Item>
			</Form>
		);
	}

	render() {
		const user: LoginUser = this.props.user;
		if (user && user.id) {
			return <Redirect to="/"></Redirect>;
		}

		return (
			<div className="login">
				<header className="login-header">
					<img src={logo} alt="logo"></img>
					<h1>React项目:后台管理系统</h1>
				</header>
				<section className="login-content">
					<div className={user.errorMsg ? 'error-msg show' : 'error-msg'}>{user.errorMsg}</div>
					<h2>用户登录</h2>
					{this.loginFromCom()}
				</section>
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user,
});

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			login: login,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
