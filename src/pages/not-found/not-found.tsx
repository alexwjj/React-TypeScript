/*
 * @Descripttion:
 * @version:
 * @Author: alexwjj
 * @Date: 2021-02-11 01:17:41
 * @LastEditors: alexwjj
 * @LastEditTime: 2021-02-11 01:56:53
 */

import { Button, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setHeadTitle } from '../../redux/actions';
import './not-found.scss';

const NotFound = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const goHome = () => {
		dispatch(setHeadTitle('首页'));
		history.push('/home');
	};

 useEffect(()=>{
   dispatch(setHeadTitle('404'))
 })
	return (
		<Row className="not-found">
			<Col span={12} className="left"></Col>
			<Col span={12} className="right">
				<h1>404</h1>
				<h2>抱歉，您访问的页面不存在</h2>
				<div>
					<Button type="primary" onClick={goHome}>
						回到首页
					</Button>
				</div>
			</Col>
		</Row>
	);
};

export default NotFound;
