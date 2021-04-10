import React from "react";

import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider,
} from "zent";
import JJForm from "../../components/zent/form";

import { Alert } from "zent";

class Data extends React.Component {
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
              title="数据类组件"
              description="主要都是表单相关的，比较重要"
            />
            <Alert title="form表单" />
            <Row>
              <Col span={16}>
                <JJForm></JJForm>
              </Col>
              <Col span={8}></Col>
            </Row>
          </Grid>
        </ConfigProvider>
      </>
    );
  }
}

export default Data;
