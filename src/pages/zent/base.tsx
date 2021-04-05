import React from "react";
import "./index.scss";
import JJIME from "../../components/zent/IME";
import JJPortal from "../../components/zent/portal";
import JJWayPoint from "../../components/zent/way-point";

import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider,
} from "zent";
import { Disabled, Button, Input, Popover } from "zent";

import { Alert, Icon } from "zent";

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
              description="主要有Disabled,ErrorBoundary,EventHandler,Icon,IMEComposition,Layout,Popover,Portal,WayPoint"
            />

            <Row>
              <Col span={12}>
                <Alert title="Disabled, 之前没用过这种。作用是把子组件会变成disabled状态，但是组件本身的props上的disabled属性拥有更高优先级。" />
                <div className="mt10">
                  <Disabled>
                    <Button type="primary">Disabled</Button>
                    <Button type="primary" disabled={false}>
                      disabled false
                    </Button>
                    <Input />
                    <Input disabled={false} placeholder="disabled设置了false" />
                  </Disabled>
                </div>
              </Col>
              <Col span={12}>
                <Alert title="Icon, 比之前用过的多了个spin的功能" />
                <div className="mt10">
                  <Icon
                    type="youzan"
                    style={{ fontSize: "30px", color: "red" }}
                  />
                  <Icon type="flow-o" spin style={{ fontSize: "30px" }} />
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Alert title="IMEComposition, 没用过，但是之前遇到过这种问题，中文输入时，还没选中文字，就会触发搜索条件。这个组件可以解决这个问题" />
                <div className="mt10">
                  <JJIME></JJIME>
                </div>
              </Col>
              <Col span={12}>
                <Alert title="Popover, 提供withPopover高阶函数，基本功能和之前使用的一样，内容区弹出的方向很多,也支持自定义定位。
                除从之外，之前用element有个定位问题，这里提供了adjustPosition手动调用，调整弹出层位置" />
                <div className="mt10">
                  <Popover
                    className="zent-popover"
                    position={Popover.Position.BottomLeft}
                    // 偏移量
                    cushion={5}
                  >
                    <Popover.Trigger.Click>
                      <Button type="primary">点击打开Popover</Button>
                    </Popover.Trigger.Click>
                    <Popover.Content>
                      <div>内容区，可以写任何html，慢慢感觉到react组件确实比vue更加自由</div>
                    </Popover.Content>
                  </Popover>
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Alert title="Portal 传送门,暂时理解为弹窗的实现外壳，类似于el-dialog" />
                <div className="mt10">
                  <JJPortal></JJPortal>
                </div>
              </Col>
              <Col span={12}>
                <Alert title="Waypoint,当滚动到某个 DOM 元素时执行一个函数，支持任意可滚动的容器。使用场景懒加载图片、无限滚动、固钉" />
                <div className="mt10">
                 <JJWayPoint></JJWayPoint>
                </div>
              </Col>
            </Row>
          </Grid>
        </ConfigProvider>
      </>
    );
  }
}

export default Home;
