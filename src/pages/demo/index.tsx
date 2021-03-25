import React from "react";
import LifeCycle from "./lifeCycle";
import { Button } from "zent";
import "./index.less";

// 定义 LifeCycle 组件的父组件

export default class LifeCycleContainer extends React.Component {
  // state 也可以像这样用属性声明的形式初始化
  state = {
    text: "父组件的文本",
    display: 'none',
    hideChild: true,
  };

  // 点击按钮，修改父组件文本的方法

  changeText = () => {
    this.setState({
      text: "修改后的父组件文本",
    });
  };

  // 点击按钮，隐藏（卸载）LifeCycle 组件的方法

  hideChild = () => {
    this.setState({
      hideChild: !this.state.hideChild,
    });
  };

  render() {
    return (
      <>
        <div className="fatherContainer">
        <Button onClick={this.changeText} type="primary">修改父组件文本内容</Button>
        <Button onClick={this.hideChild} type="danger">显示子组件</Button>
        {this.state.hideChild ? null : <LifeCycle text={this.state.text} count={1}/>}
        </div>
      </>
    );
  }
}
