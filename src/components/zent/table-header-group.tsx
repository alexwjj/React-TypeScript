import { Grid } from "zent";
import * as React from "react";
interface IData {
  id: string;
  name: string;
  stock: number;
  type: string;
  company: string;
  phone: string;
  createdTime: string;
  sortBy?: string
  sortType?: number;
}

const datasets: IData[] = [];

for (let i = 0; i < 3; i++) {
  datasets.push({
    id: `id-${i}`,
    name: `商品 ${i}`,
    type: `type-${i}`,
    company: `company-${i}`,
    phone: `123342345${i}`,
    stock: 5,
    createdTime: "2018-12-11",
  });
}

export default class TableHeaderGroup extends React.Component {
  state = {
    datasets,
    sortBy: '',
    sortType: 0,
  };

  getColumns = () => {
    return [
      {
        title: "商品名",
        name: "name",
        className: "name",
        width: 100,
        fixed: true,
      },
      {
        title: "商品信息",
        name: "productInfo",
        children: [
          {
            title: "类型",
            name: "type",
            width: 200,
          },
          {
            title: "供货商",
            name: "supplier",
            children: [
              {
                title: "公司",
                name: "company",
                width: 300,
              },
              {
                title: "电话",
                name: "phone",
                width: 300,
              },
            ],
          },
        ],
      },
      {
        title: "库存",
        name: "stock",
        defaultText: 0,
      },
      {
        title: "创建时间",
        name: "createdTime",
        width: 100,
        needSort: true,
        fixed: "right",
      },
    ];
  };

  onChange = (conf: any) => {
    this.setState({
      ...conf,
    });
  };

  render() {
    const { sortBy, sortType } = this.state;
    return (
      <Grid
        // @ts-ignore
        columns={this.getColumns()}
        datasets={this.state.datasets}
        rowClassName={(data, index) => `${data.id}-${index}`}
        bordered
        scroll={{ x: 1400, y: 400 }}
        sortBy={sortBy}
        // @ts-ignore
        sortType={sortType}
        rowKey="id"
        onChange={this.onChange}
      />
    );
  }
}