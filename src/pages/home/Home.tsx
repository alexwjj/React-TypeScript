/*
 * @Descripttion:
 * @version:
 * @Author: alexwjj
 * @Date: 2020-10-01 19:10:44
 * @LastEditors: alexwjj
 * @LastEditTime: 2021-02-11 21:35:13
 */
import { Card, Statistic, DatePicker, Timeline } from 'antd';
import { QuestionCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import './home.scss';
import Line from './line';
import Bar from './bar';
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';

const Home = () => {
	const [key, setKey] = useState<string>('views');

	const tabListNoTitle = [
		{
			key: 'views',
			tab: <div style={{fontSize:'x-large'}}>访问量</div>,
		},
		{
			key: 'sales',
			tab:<div style={{fontSize:'x-large'}}>销售量</div>,
		},
	];

	const contentListNoTitle = {
		views: <Bar />,
		sales: <Bar />,
	};

	const onTabChange = (key: string, type: string) => {
		setKey(key);
	};

	return (
		<div className='home'>
			<div className="home-top">
				<Card title="商品总量" style={{ width: 250 }} extra={<QuestionCircleOutlined />} className="home-statistic">
					<Statistic value={112893} suffix={'个'}></Statistic>
					<Statistic
						value={15}
						precision={2}
						suffix={
							<div>
								<span>%</span>
								<ArrowUpOutlined style={{ color: '#3f8600' }} />
							</div>
						}
						prefix="周同比"
					></Statistic>
					<Statistic
						value={16}
						precision={2}
						suffix={
							<div>
								<span>%</span>
								<ArrowDownOutlined style={{ color: '#cf1322' }} />
							</div>
						}
						prefix="日同比"
					></Statistic>
				</Card>
				<Line className="home-line" />
			</div>
			<Card
        className='home-content'
				style={{ width: '100%' }}
				tabList={tabListNoTitle}
				activeTabKey={key}
				tabBarExtraContent={
					<DatePicker.RangePicker
						size="large"
						defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
						format={dateFormat}
					/>
				}
				onTabChange={(key) => {
					onTabChange(key, 'noTitleKey');
				}}
			>
				<div className="home-bottom">
					<Card className="home-bar" title={<div className='title'>{tabListNoTitle.find((item) => item.key === key)?.tab}</div>}>
						{contentListNoTitle[key]}
					</Card>
					<Card title="任务" className="home-timeline">
						<Timeline>
							<Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
							<Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
							<Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
							<Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
						</Timeline>
					</Card>
				</div>
			</Card>
		</div>
	);
};

export default Home;
