import { IMEComposition, Input, Button } from "zent";
import * as React from "react";

function JJIME() {
  const [enable, setEnable] = React.useState(true);
  const [text, setText] = React.useState("");

  const onInputChange = (e: any) => {
    setText(e.target.value);
  };

  return (
    <div>
      <IMEComposition enable={enable}>
        <Input value={text} onChange={onInputChange} placeholder="切换中文输入能看出效果"/>
        <Input value={text} onChange={onInputChange} type="textarea" />
      </IMEComposition>
      <Button type="primary" onClick={() => setEnable(!enable)}>
        {enable ? "Disable" : "Enable"} IMEComposition
      </Button>
    </div>
  );
}

export default JJIME
