import React from "react";
import { Affix, Alert } from "zent";

interface IProps {
  offsetTop?: number;
  title?: string;
}

class JJAffix extends React.Component<IProps, any> {
  static defaultProps = {
    offsetTop: 0,
    title: "默认标题",
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      text: this.props.title,
    }
  }

  // 页面滚动  固定时的操作
  onPin = () => {
    this.setState({
      text: '固定在位置上啦'
    })
  };
  // 页面还原到 改图钉原有位置
  onUnpin = () => {
    this.setState({
      text: '回到原来的位置啦'
    })
  };

  render() {
    return (
      <Affix offsetTop={this.props.offsetTop} onPin={this.onPin} onUnpin={this.onUnpin}>
        <Alert type="warning">{this.props.title}</Alert>
      </Affix>
    );
  }
}

export default JJAffix;
