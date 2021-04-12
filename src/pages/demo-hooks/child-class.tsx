import * as React from "react";
import { Notify, Button } from "zent";
interface IProps {
    value: string
}
class Child extends React.Component<IProps,any>{
  handleLog = () => {
    Notify.info("点击了子组件");
  };
  render() {
    return <Button type="success" onClick={this.handleLog}>点击按钮:{this.props.value} </Button >;
  }
}
export default Child;
