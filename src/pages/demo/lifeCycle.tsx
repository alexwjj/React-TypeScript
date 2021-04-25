import React from "react";
import { Button } from "zent";
interface IProps {
  text: string;
  count: number;
}
// 定义子组件
export default class LifeCycle extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    console.log("进入constructor");
    // state 可以在 constructor 里初始化
    this.state = { text: "子组件的文本" };
  }
  // 初始化/更新时调用
  static getDerivedStateFromProps(props: any, state: any) {
    console.log(props, state, "getDerivedStateFromProps方法执行");

    return {
      fatherText: props.text,
    };
  }

  // 初始化渲染时调用

  componentDidMount() {
    console.log("componentDidMount方法执行");
  }

  // 组件更新时调用

  shouldComponentUpdate(prevProps: any, nextState: any) {
    console.log(prevProps, nextState, "shouldComponentUpdate方法执行");

    return true;
  }

  // 组件更新时调用

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    console.log("getSnapshotBeforeUpdate方法执行");

    return "componentDidUpdated的第三个参数";
  }

  // 组件更新后调用

  componentDidUpdate(preProps: any, preState: any, valueFromSnapshot: any) {
    console.log("componentDidUpdate方法执行");

    console.log("从 getSnapshotBeforeUpdate 获取到的值是", valueFromSnapshot);
  }

  // 组件卸载时调用

  componentWillUnmount() {
    console.log("子组件的componentWillUnmount方法执行");
  }

  // 点击按钮，修改子组件文本内容的方法

  changeText = () => {
    this.setState({
      text: "修改后的子组件文本",
    });
  };

  render() {
    console.log("render方法执行");

    return (
      <div className="container">
        <Button onClick={this.changeText} className="changeText">
          修改子组件文本内容
        </Button>
        
        <p> {this.props.count} </p>

        <p className="textContent">{this.state.text}</p>

        <p className="fatherContent">{this.props.text}</p>
      </div>
    );
  }
}
