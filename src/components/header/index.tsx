/*
 * @Descripttion:
 * @version:
 * @Author: alexwjj
 * @Date: 2021-01-31 19:59:55
 * @LastEditors: alexwjj
 * @LastEditTime: 2021-02-02 23:43:29
 */
import { Modal } from 'antd';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
// import { reqWheater } from '../../api';
import { formatDate } from '../../utils/DateUtils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less';
import LinkButton from '../link-button';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { logout } from '../../redux/actions';
import { Affix } from "zent";


const mapStateToProps = (state: RootState) => ({
	headTitle: state.headTitle,
	user: state.user,
});

const mapDispatchToProps = {
	logout
};
// interface userSession {
// 	name?: string;
// 	password?: string;
// }

const userSession: any = JSON.parse(sessionStorage.getItem('user') || '{}');
interface HeaderState {
	currentTime: string;
	dayPictureUrl: string;
	weather: string;
}

type HeaderProps = RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class Header extends Component<HeaderProps, HeaderState> {
	timerId: NodeJS.Timeout | null = null;
	user = this.props.user;
	constructor(props: HeaderProps) {
		super(props);
		this.state = {
			currentTime: formatDate(Date.now()),
			dayPictureUrl: '',
			weather: '',
		};
	}

	componentDidMount() {
		this.getNowTime();
		// this.getWeather();
	}

	// private async getWeather() {
	// 	const { dayPictureUrl, weather } = await reqWheater('常州');
	// 	this.setState({
	// 		dayPictureUrl,
	// 		weather,
	// 	});
	// }

	private getNowTime() {
		this.timerId = setInterval(() => {
			this.setState({
				currentTime: formatDate(Date.now()),
			});
		}, 1000);
	}

	componentWillUnmount() {
		if (this.timerId !== null) {
			clearInterval(this.timerId);
		}
	}
	private logout(): any {
		Modal.confirm({
			content: '是否退出',
			icon: <ExclamationCircleOutlined />,
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				// this.props.logout();
				sessionStorage.removeItem('user')
				this.props.history.push('/')
			},
			onCancel: () => {
				console.log('cancel');
			},
		});
	}

	render() {
		
		return (
			<Affix offsetTop={0}>
			<div className="header">
				<div className="header-top">
					<span>欢迎，{userSession ? userSession.name : ''}</span>
					<LinkButton onClick={this.logout.bind(this)}>退出</LinkButton>
				</div>
				{/* <div className="header-bottom">
					<div className="header-bottom-left">{this.props.headTitle}</div>
					<div className="header-bottom-right">
						<span>{this.state.currentTime}</span>
						<img src={this.state.dayPictureUrl} alt="weather"></img>
						<span>{this.state.weather}</span>
					</div>
				</div> */}
			</div>
			</Affix>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
