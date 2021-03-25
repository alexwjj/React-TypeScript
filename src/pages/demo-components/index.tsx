import "./index.less";
import React from "react";
import { Breadcrumb } from "zent";
import HelpIcon from "../../components/help-icon";
import ContentTitle from "../../components/content-title";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider,
} from 'zent';

function Example() {
  console.log(useHistory(), "useHistory");
  console.log(useLocation(), "useLocation");
  //useParams存储动态路由参数的地方,此时没有使用动态路由，也没有路由传参，无任何输出
  console.log(useParams(), "useParams");
  console.log(useRouteMatch(), "useRouteMatch");
  const dataList = [
    { name: "首页", href: "//www.youzan.com" },
    { name: "应用中心", href: "//www.youzan.com" },
    { name: "营销中心" },
  ];
  return (
    <>
    <ConfigProvider
    value={{
      rowGutter: 0,
      colGutter: 0,
    }}
  >
    <Grid className="layout-demo-basic">
      <Row justify="center">
        <Col span={24}>
          <h1>标题</h1>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col span={4}>
          <div>JJJ1111</div>
        </Col>
        <Col span={4} >
          <div>JJJJ2222</div>
        </Col>
        <Col span={4} >
          <div>JJJJ333</div>
        </Col>
      </Row>
    </Grid>
  </ConfigProvider>
  <ContentTitle type="youzan" title="有你有赞" iconClassName="icon-youzan" ></ContentTitle>
      <Breadcrumb breads={dataList} />
      <HelpIcon
        iconClassName="help-icon-demo"
        iconType="youzan"
        content="help"
        spin
      ></HelpIcon>
    </>
  );
}

export default Example;
