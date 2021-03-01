/*
 * @Descripttion:
 * @version:
 * @Author: alexwjj
 * @Date: 2020-10-14 21:16:42
 * @LastEditors: alexwjj
 * @LastEditTime: 2021-02-11 01:32:47
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import { Redirect, Route,  Switch } from 'react-router-dom';
import Category from '../category/Category';
import Product from '../product/Product';
import Role from '../role/Role';
import Bar from '../chars/Bar';
import Line from '../chars/Line';
import Pie from '../chars/Pie';
import Home from '../home/Home';
import User from '../user/User';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';
import NotFound from '../not-found/not-found';
const { Footer, Sider, Content } = Layout;

type IProps = ReturnType<typeof mapStateToProps>;

class admin extends Component<IProps, {}> {
	render() {
		const user = sessionStorage.getItem('user');
		if (!user) {
			return <Redirect to="/login"></Redirect>;
		}
		return (
			<Layout style={{ minHeight: '100%' }}>
				<Sider>
					<LeftNav></LeftNav>
				</Sider>
				<Layout>
					<Header></Header>
					<Content style={{ backgroundColor: '#fff', margin: '20px' }}>
						<Switch>
							<Redirect exact={true} from="/" to="/home"></Redirect>
							<Route path="/home" component={Home}></Route>
							<Route path="/category" component={Category}></Route>
							<Route path="/product" component={Product}></Route>
							<Route path="/role" component={Role}></Route>
							<Route path="/user" component={User}></Route>
							<Route path="/bar" component={Bar}></Route>
							<Route path="/line" component={Line}></Route>
							<Route path="/pie" component={Pie}></Route>
							<Route component={NotFound}></Route>
						</Switch>
					</Content>
					<Footer style={{ textAlign: 'center', color: '#cccccc' }}>
						推荐使用谷歌浏览器，可以获得最佳页面操作体验
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user,
});

export default connect(mapStateToProps, {})(admin);
