import "./index.less";
import React from "react";
import { Breadcrumb } from "zent";
// import HelpIcon from "../../components/help-icon";
import ContentTitle from "../../components/content-title";
import UseRouter from "./use-router";
import VipIcon from "../../components/vip-icon";


import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider,
} from "zent";

function Example() {
  const dataList = [
    { name: "首页", href: "/" },
    { name: "demo-hooks", href: "/demo-hooks" },
    { name: "demo-components" },
  ];
  return (
    <>
      <Breadcrumb breads={dataList} />
      <ConfigProvider
        value={{
          rowGutter: 10,
          colGutter: 0,
        }}
      >
        <Grid className="layout-demo-basic">
          <Row>
            <Col span={24}>
              <ContentTitle
                isShowIcon
                title="有你有赞"
                iconClassName="icon-youzan"
              ></ContentTitle>
            </Col>
          </Row>
          <div style={{'color': 'red','fontSize': '20px'}}>这是一个练习组件边写的页面</div>
          <Row>
            <Col span={24}>
              <ContentTitle title="路由的一些操作"></ContentTitle>
            </Col>
          </Row>
          <UseRouter></UseRouter>
          <Row>
            <Col span={24}>
              <ContentTitle title="CSS Object"></ContentTitle>
            </Col>
          </Row>
          <VipIcon vip={1}></VipIcon>
        </Grid>
      </ConfigProvider>
    </>
  );
}

export default Example;
