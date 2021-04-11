import React, { useState } from "react";
import JDialog from "../../components/zent/dialog";
import JDrawer from "../../components/zent/drawer";
import { JLoading } from "../../components/zent/loading";

import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider,
} from "zent";

import { Alert, AnimateHeight, Button, Placeholder, Sweetalert } from "zent";

const Feedback: React.FC = () => {
  const [height, setHeight] = useState<number>(200);
  const onAdd = () => {
    setHeight(height + 100);
  };
  const onDec = () => {
    setHeight(height - 100);
  };
  const showAlertInfo = () => {
    Sweetalert.alert({
      content: "这个是具体内容",
      parentComponent: this,
    });
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
          <Alert title="Dialog 弹窗, 两种用法，基础用法通过一个变量控制弹窗展示，还可以通过openDialog来打开一个弹窗" />
          <Row>
            <Col span={24}>
              <JDialog></JDialog>
            </Col>
          </Row>
          <Alert title="drawer 常规用法，没有命令模式" />
          <Row>
            <Col span={24}>
              <JDrawer></JDrawer>
            </Col>
          </Row>
          <Alert title="loading 多种玩法" />
          <Row>
            <Col span={24}>
              <JLoading></JLoading>
            </Col>
          </Row>
          <Alert title="Placeholder 占位块" />
          <Row>
            <Col span={24}>
              {/* @ts-ignore */}
              <Placeholder.RichTextBlock rows={4} />
              {/* @ts-ignore */}
              <Placeholder.RichTextBlock
                rows={7}
                shape="rect"
                size={160}
                dashed={false}
              />
            </Col>
          </Row>
          <Alert title="Sweetalert 弹窗，不支持自定义，相当于element中的confirm弹窗，多用于二次确认" />
          <Row>
            <Col span={24}>
              <Button onClick={showAlertInfo}>消息对话框</Button>
            </Col>
          </Row>
        </Grid>
      </ConfigProvider>
    </>
  );
};

export default Feedback;
