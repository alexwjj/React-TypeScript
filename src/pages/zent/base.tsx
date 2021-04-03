import React from "react";

import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider,
} from "zent";

import { Alert } from "zent";

class Home extends React.Component {
  state = {
    current: 1,
  };
  render() {
    return (
      <>
        <ConfigProvider
          value={{
            rowGutter: 20,
            colGutter: 0,
          }}
        >
          <Grid>
            <Alert
                type="info"
                outline
                title="基础类组件"
                description="主要有affix/breadcrumb/dropdown/grid/menu/pagination/steps/tabs/tree, 先熟悉下这个，后面组件嵌套着用"
              />

            <Alert title="tabs选项卡,3种type类型,'normal' , 'card' , 'button'" />
            <Row>
              <Col span={12}></Col>
              <Col span={12}></Col>
            </Row>
          </Grid>
        </ConfigProvider>
      </>
    );
  }
}

export default Home;
