/* tslint:disable */
import { Grid, Notify } from "zent";
import React from 'react';

interface IData {
    id: string,
    name: string,
    uv: number,
    stock: number,
}
const columns = [
  {
    title: "grid组件实现的table",
    name: "name",
  },
  {
    title: "访问量",
    name: "uv",
  },
  {
    title: "库存",
    name: "stock",
  },
];

const pageSize = 5;
const totalItem = 10;

const datasets: IData[] = [];
const datasets2: IData[] = [];

for (let i = 0; i < 5; i++) {
  datasets.push({
    id: `f-${i}`,
    name: `母婴商品 ${i}`,
    uv: 20,
    stock: 5,
  });
  datasets2.push({
    id: `s-${i}`,
    name: `宠物商品 ${i}`,
    uv: 20,
    stock: 5,
  });
}
interface IState {
    selectedRowKeys: any,
    datasets: IData[],
    current: number
}

export default class Table extends React.Component<any, IState> {
  state = {
    selectedRowKeys: ["f-0"],
    datasets,
    current: 1,
  };
//   @ts-ignore
  onChange = ({ current }) => {
    this.setState({
      current,
      datasets: current === 1 ? datasets : datasets2,
    });
  };

  render() {
    return (
      <Grid
        columns={columns}
        datasets={this.state.datasets}
        pageInfo={{
          pageSize: pageSize,
          total: totalItem,
          current: this.state.current,
        }}
        paginationType="lite"
        selection={{
          selectedRowKeys: this.state.selectedRowKeys,
          onSelect: (selectedRowKeys, selectedRows, currentRow) => {
            if (selectedRowKeys.length > 2) {
              Notify.error("你最多选择两个");
              this.setState({
                // @ts-ignore
                selectedRowKeys: [].concat(this.state.selectedRowKeys),
              });
            } else {
              this.setState({
                selectedRowKeys,
              });
            }
          },
          getSelectionProps: (data) => ({
            disabled: data.name === "母婴商品 1",
            reason: "禁用原因",
          }),
        }}
        rowKey="id"
        // @ts-ignore
        onChange={this.onChange}
      />
    );
  }
}

