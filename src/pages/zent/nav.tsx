import React from "react";
import JJAffix from "../../components/zent/affix";
import JJTable from "../../components/zent/table";
import TableHeaderGroup from "../../components/zent/table-header-group";
import JJTree from "../../components/zent/tree";
import JJTreePlain from "../../components/zent/tree-plain";
import { Breadcrumb } from "zent";

import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider,
} from "zent";

import {
  Dropdown,
  Menu,
  DropdownButton,
  DropdownPosition,
  DropdownClickTrigger,
  DropdownContent,
} from "zent";
import { Alert, Pagination, Notify, Steps, Tabs } from "zent";
const { MenuItem } = Menu;

class Nav extends React.Component {
  state = {
    current: 1,
    dataList: [
      { name: "zent", href: "/" },
      { name: "Demo", href: "/demo" },
      { name: "Demo-Hooks", href: "/demo-hooks" },
      { name: "Demo-Components" },
    ],
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
            <Row>
              <Col span={24}>
                <Alert
                  type="info"
                  outline
                  title="导航类组件"
                  description="主要有affix/breadcrumb/dropdown/grid/menu/pagination/steps/tabs/tree, 先熟悉下这个，后面组件嵌套着用"
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <JJAffix
                  title="affix图钉组件，主要用于控制一些元素的定位"
                  offsetTop={0}
                ></JJAffix>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Breadcrumb breads={this.state.dataList} />
              </Col>
              <Col span={12}>
                <Dropdown
                  cushion={0}
                  containerSelector="body"
                  position={DropdownPosition.AutoBottomLeft}
                >
                  <DropdownClickTrigger>
                    <DropdownButton type="primary">
                      菜单 Dropdown(项目中没有用到)
                    </DropdownButton>
                  </DropdownClickTrigger>
                  <DropdownContent>
                    <Menu>
                      <MenuItem>subMenu01</MenuItem>
                      <MenuItem>subMenu02</MenuItem>
                    </Menu>
                  </DropdownContent>
                </Dropdown>
              </Col>
            </Row>
            <Alert title="grid组件 实现table功能 zent官网table文档丢失" />
            <Row>
              <Col span={12}>
                <JJTable></JJTable>
              </Col>
              <Col span={12}>
                <TableHeaderGroup></TableHeaderGroup>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Alert title="分页组件" />
                <Pagination
                  current={1}
                  pageSize={10}
                  total={30}
                  onChange={() => {
                    Notify.info("分页组件切换");
                  }}
                />
              </Col>
              <Col span={12}></Col>
            </Row>
            <Alert title="step进度条组件，4种类型可选, 'number', 'card' , 'breadcrumb' , 'tabs'" />
            <Row>
              <Col span={12}>
                <Steps current={this.state.current} status="finish">
                  <Steps.Step title="第一步" description="分享邀请码给好友" />
                  <Steps.Step
                    title="第二步"
                    description="订购时输入你的邀请码"
                  />
                  <Steps.Step title="第三步" description="获得有赞E卡奖励" />
                </Steps>
              </Col>
              <Col span={12}>
                <Steps
                  current={this.state.current}
                  type="breadcrumb"
                  onStepChange={() => {
                    this.setState({ current: this.state.current + 1 });
                  }}
                >
                  <Steps.Step title="登录有赞帐号" />
                  <Steps.Step title="选择门店" />
                  <Steps.Step title="绑定门店" />
                  <Steps.Step title="完成" />
                </Steps>
              </Col>
            </Row>
            <Alert title="tabs选项卡,3种type类型,'normal' , 'card' , 'button'" />
            <Row>
              <Col span={12}>
                <Tabs
                  activeId={this.state.current}
                  onChange={() => {
                    this.setState({ current: this.state.current + 1 });
                  }}
                  type="button"
                >
                  <Tabs.TabPanel key="1" tab={<span>选项一</span>} id={1}>
                    <div>选项一的内容</div>
                  </Tabs.TabPanel>
                  <Tabs.TabPanel key="2" tab="选项二" id={2}>
                    <div>选项二的内容</div>
                  </Tabs.TabPanel>
                </Tabs>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Alert title="tree组件,dataType支持两种数据源，tree，默认树结构数据源。 plain，对应列表数据源" />
            <Row>
              <Col span={12}>
                <JJTree></JJTree>
              </Col>
              <Col span={12}>
                <JJTreePlain></JJTreePlain>
              </Col>
            </Row>
            <Alert
                  type="info"
                  outline
                  title="数据类组件"
                  description="主要有affix/breadcrumb/dropdown/grid/menu/pagination/steps/tabs/tree, 先熟悉下这个，后面组件嵌套着用"
                />
          </Grid>
        </ConfigProvider>
      </>
    );
  }
}

export default Nav;
