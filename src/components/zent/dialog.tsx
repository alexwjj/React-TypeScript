import { Dialog, Button } from "zent";
import * as React from "react";
const { openDialog, closeDialog } = Dialog;
const id = "my_dialog";

export default class JDialog extends React.Component {
  state = { visible: false };

  setVisible = (visible) => {
    this.setState({ visible });
  };

  open = () => {
    openDialog({
      dialogId: id, // id is used to close the dialog
      title: "使用 openDialog 直接打开对话框",
      children: <div>Hello World</div>,
      footer: <Button onClick={() => closeDialog(id)}>关闭</Button>,
      onClose() {
        console.log("outer dialog closed");
      },
    });
  };

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(prevProps: any, nextState: any) {
    console.log(prevProps, nextState, "shouldComponentUpdate方法执行");
    return true;
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={() => this.setVisible(true)}>
          基础用法 - 点击展示
        </Button>
        <Button type="danger" onClick={() => this.open()}>
        openDialog命令式 - 点击展示
        </Button>
        <Dialog
          visible={this.state.visible}
          onClose={() => this.setVisible(false)}
          footer={<Button onClick={() => this.setVisible(false)}>关闭</Button>}
          title="对话框"
        >
          <p>通过visible变量来控制弹窗的显示与隐藏，和element的相似</p>
        </Dialog>
      </div>
    );
  }
}
