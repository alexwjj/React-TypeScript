/*
 * @Descripttion:
 * @version:
 * @Author: alexwjj
 * @Date: 2021-02-10 14:53:44
 * @LastEditors: alexwjj
 * @LastEditTime: 2021-02-10 14:59:15
 */

import { Chart, Interval } from 'bizcharts';
import React from 'react';

const Bar = () => {

  const data = [
    { year: ' 一月', sales: 38 },
    { year: ' 二月', sales: 38 },
    { year: ' 三月', sales: 38 },
    { year: ' 四月', sales: 38 },
    { year: ' 五月', sales: 38 },
    { year: ' 六月', sales: 38 },
    { year: ' 七月', sales: 38 },
    { year: ' 八月', sales: 38 },
    { year: ' 九月', sales: 38 },
    { year: ' 十月', sales: 38 },
    { year: ' 十一月', sales: 38 },
    { year: ' 十二月', sales: 38 },
   
  ];

	return (
		<Chart height={300} autoFit data={data}>
			<Interval position="year*sales" />
		</Chart>
	);
};

export default Bar;
