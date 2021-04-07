import React, { useState } from "react";

import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider,
} from "zent";

import { Alert, AnimateHeight, Button } from "zent";

const Feedback: React.FC = () => {
  const [height, setHeight] = useState<number>(200);
  const onAdd = () => {
    setHeight(height + 100);
  };
  const onDec = () => {
    setHeight(height - 100);
  };

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
            title="反馈类组件"
            description="弹窗、Loading、提示等等"
          />

          <Alert title="AnimateHeight 高度渐变, 将容器以动画形式渐变为指定的高度。" />
          <Row>
            <Col span={12}>
              <Button onClick={onAdd}>+100px</Button>
              <Button onClick={onDec}>-100px</Button>
              <AnimateHeight
                height={height}
                style={{ background: "#114db4", marginTop: 16 }}
              >
                <div style={{ height: height }}></div>
              </AnimateHeight>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Alert title="Dialog 弹窗, 基础用法通过一个变量控制弹窗展示，还可以通过openDialog来打开一个弹窗" />
          <Row>
            <Col span={12}>
              <Button type="primary">todo</Button>
            </Col>
            <Col span={12}></Col>
          </Row>
        </Grid>
      </ConfigProvider>
    </>
  );
};

export default Feedback;
