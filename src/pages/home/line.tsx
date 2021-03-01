/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-02-08 23:39:49
 * @LastEditors: MFine
 * @LastEditTime: 2021-02-10 21:12:39
 */
import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts"

// 数据源
const data = [
      {
        month: "Jan",
        city: "a",
        temperature: 7
      },
      {
        month: "Jan",
        city: "b",
        temperature: 3.9
      },
      {
        month: "Jan",
        city: "c",
        temperature: 4.9
      },
      {
        month: "Feb",
        city: "a",
        temperature: 6.9
      },
      {
        month: "Feb",
        city: "b",
        temperature: 4.2
      },
      {
        month: "Feb",
        city: "c",
        temperature: 5.2
      },
      {
        month: "Mar",
        city: "a",
        temperature: 9.5
      },
      {
        month: "Mar",
        city: "b",
        temperature: 5.7
      },
      {
        month: "Mar",
        city: "c",
        temperature: 8.7
      },
      {
        month: "Apr",
        city: "a",
        temperature: 14.5
      },
      {
        month: "Apr",
        city: "b",
        temperature: 8.5
      },
      {
        month: "Apr",
        city: "c",
        temperature: 9.5
      },
      {
        month: "May",
        city: "a",
        temperature: 18.4
      },
      {
        month: "May",
        city: "b",
        temperature: 11.9
      },
      {
        month: "May",
        city: "c",
        temperature: 13.9
      },
      {
        month: "Jun",
        city: "a",
        temperature: 21.5
      },
      {
        month: "Jun",
        city: "b",
        temperature: 15.2
      },
      {
        month: "Jun",
        city: "c",
        temperature: 10.2
      },
      {
        month: "Jul",
        city: "a",
        temperature: 25.2
      },
      {
        month: "Jul",
        city: "b",
        temperature: 17
      },
      {
        month: "Jul",
        city: "c",
        temperature: 12
      },
      {
        month: "Aug",
        city: "a",
        temperature: 26.5
      },
      {
        month: "Aug",
        city: "b",
        temperature: 16.6
      },
      {
        month: "Aug",
        city: "c",
        temperature: 14.6
      },
      {
        month: "Sep",
        city: "a",
        temperature: 23.3
      },
      {
        month: "Sep",
        city: "b",
        temperature: 14.2
      },
      {
        month: "Sep",
        city: "c",
        temperature: 10.2
      },
      {
        month: "Oct",
        city: "a",
        temperature: 18.3
      },
      {
        month: "Oct",
        city: "b",
        temperature: 10.3
      },
      {
        month: "Oct",
        city: "c",
        temperature: 8.3
      },
      {
        month: "Nov",
        city: "a",
        temperature: 13.9
      },
      {
        month: "Nov",
        city: "b",
        temperature: 6.6
      },
      {
        month: "Nov",
        city: "c",
        temperature: 3.6
      },
      {
        month: "Dec",
        city: "a",
        temperature: 9.6
      },
      {
        month: "Dec",
        city: "b",
        temperature: 4.8
      },
      {
        month: "Dec",
        city: "c",
        temperature: 8.8
      }
    ];

const Line=(props:any)=> {
  const cols = {
      month: {
        range: [0, 1]
      }
    }
    return (
        <Chart  data={data} scale={cols} autoFit onAxisLabelClick={console.log} {...props}>
          <Legend/>
          <Axis name="month"/>
          <Axis
            name="temperature"
            label={{
              formatter: (val:number|string) => `${val}万个`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
            itemTpl={`
              <tr data-index={index}>'
                <td><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span></td>
                <td>{name}</td>
                <td>{value}</td>
              </tr>
           `}

          >
					 {
						 (title:any, items:any) => {
							 // 配置了 class="g2-tooltip-list" 则会将模版中的内容渲染进来
							 // 您也可以根据 items 自行渲染
							 return (<table>
								<thead>
									<tr>
										<th>&nbsp;</th>
										<th>{title}</th>
										<th>&nbsp;</th>
										<th>{items[0].name}</th>
										<th>&nbsp;</th>
										<th>{items[0].value}</th>
									</tr>
								</thead>
									<tbody
										className="g2-tooltip-list"
									>
								</tbody>
            		</table>);
						 }
					 }
					</Tooltip>
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color={"city"}
            shape={"smooth"}
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape={"circle"}
            color={"city"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
    );
  
}


export default Line;