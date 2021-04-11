import React from "react";

import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider,
} from "zent";

import {
  Alert,
  Avatar,
  Badge,
  Icon,
  BlockHeader,
  Progress,
  TextMark,
} from "zent";
import JCollection from "../../components/zent/collapse";
import JInfinite from "../../components/zent/Infinite";
import JSwiper from "../../components/zent/swiper";

class Show extends React.Component {
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
              title="展示类组件"
              description="一些card、avatar、progress等展示"
            />

            <Alert title="这里写写各种小的类别" />
            <Row>
              <Col span={12}>
                <Avatar
                  size="large"
                  shape="square"
                  src="https://img.yzcdn.cn/public_files/2018/02/01/5df3bb4b640ddc5efae915b7af90a243.png"
                />
                <Avatar
                  size={48}
                  style={{
                    fontSize: 30,
                    backgroundColor: "#e8e8e8",
                    color: "#dc9656",
                  }}
                >
                  IT
                </Avatar>
                <Badge count={1200} maxCount={999}>
                  <Icon
                    type="bell-o"
                    style={{ width: "100px", fontSize: "30px" }}
                  />
                </Badge>
              </Col>
              <Col span={12}></Col>
            </Row>
            <BlockHeader
              title="BlockHeader 标题1"
              tooltip={<span>test</span>}
              position="top-center"
            />
            <BlockHeader
              title="BlockHeader 标题2"
              type="minimum"
              tooltip={<span>test</span>}
              position="top-center"
            />
            <Row>
              <Col span={12}>
                <JCollection></JCollection>
              </Col>
              <Col span={12}>
                <JInfinite></JInfinite>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Progress percent={70} />
                <Progress type="circle" percent={80} status="success" />
                <Progress type="circle" percent={30} status="exception" />
                <Progress
                  percent={80}
                  type="circle"
                  format={(percent) => (
                    <div>
                      <div>进度</div>
                      <div>{percent}%</div>
                    </div>
                  )}
                />
              </Col>
              <Col span={12}>
                <JSwiper></JSwiper>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <TextMark
                  style={{ lineHeight: "28px" }}
                  activeIndex={1}
                  activeStyle={{ backgroundColor: "#f48f42" }}
                  highlightStyle={{ backgroundColor: "#ffd54f" }}
                  searchWords={["先生"]}
                  textToHighlight="关键字：先生。奴才总不过是寻人诉苦。只要这样，也只能这样。有一日，他遇到一个聪明人。“先生！”他悲哀地说。"
                />
                ,
              </Col>
              <Col span={12}></Col>
            </Row>
          </Grid>
        </ConfigProvider>
      </>
    );
  }
}

export default Show;
