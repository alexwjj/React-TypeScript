import "./index.less";
import React from "react";
import { BlockHeader, Alert } from "zent";
// import HelpIcon from "../../components/help-icon";
import ContentTitle from "../../components/content-title";
import VipIcon from "../../components/vip-icon";

import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider,
} from "zent";

function Example() {
  return (
    <>
      <ConfigProvider
        value={{
          rowGutter: 10,
          colGutter: 0,
        }}
      >
        <Grid className="layout-demo-basic">
          <Alert
            type="info"
            outline
            title="封装一些组件"
            description="熟悉项目中已有的一些组件，同时学习代码规范等"
          />
          <BlockHeader title="标题组件"></BlockHeader>
          <Row>
            <Col span={24}>
              <ContentTitle
                isShowIcon
                title="有你有赞"
                iconClassName="icon-youzan"
              ></ContentTitle>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
            </Col>
          </Row>
          <BlockHeader title="会员等级组件，根据会员等级显示不同图标"></BlockHeader>
          <VipIcon vip={0}></VipIcon>
          <VipIcon vip={1}></VipIcon>
          <VipIcon vip={10}></VipIcon>
        </Grid>
      </ConfigProvider>
    </>
  );
}

export default Example;
