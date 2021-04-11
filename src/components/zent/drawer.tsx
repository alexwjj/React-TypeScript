import { Button, Drawer, Radio } from "zent";
import * as React from "react";

const RadioGroup = Radio.Group;

function JDrawer() {
  const [visible, setVisible] = React.useState(false);
  const [placement, setPlacement] = React.useState("top");

  return (
    <>
      <RadioGroup
        onChange={(e) => setPlacement(e.target.value || "top")}
        value={placement}
      >
        <Radio value="top">top</Radio>
        <Radio value="right">right</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="left">left</Radio>
      </RadioGroup>
      <Button
        onClick={() => setVisible(true)}
        type="primary"
        style={{ marginLeft: "20px" }}
      >
        Open
      </Button>
      <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        // @ts-ignore
        placement={placement}
        maskClosable
      >
        <div>Drawer Content ...</div>
        <div>Drawer Content ...</div>
        <div>Drawer Content ...</div>
      </Drawer>
    </>
  );
}

export default JDrawer;
