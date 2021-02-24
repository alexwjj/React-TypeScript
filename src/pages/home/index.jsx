import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider,
} from "zent";
import React from "react";
import { Redirect } from "react-router-dom";
import "./index.scss";
import MenuList from "./menuList";
import Header from "./header";
class Home extends React.Component {
  render() {
    if (!localStorage.getItem("user")) {
      return <Redirect to="/login" />;
    }
    return (
      <ConfigProvider
        value={{
          rowGutter: 0, colGutter: 0
        }}
      >
        <Grid className="layout">
          <Row>
            <Col span={24}>
              <Header></Header>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <div className="layout-menu">
                <MenuList></MenuList>
              </div>
            </Col>
            <Col span={18}>
              <div className="layout-content">内容区</div>
            </Col>
          </Row>
        </Grid>
      </ConfigProvider>
    );
  }
}

export default Home;
