import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Button, BlockHeader } from "zent";
import Child from "./child-class";
interface IPropsText {
  value: string;
}
type IProps = Partial<IPropsText>;

// function Child(props: IProps) {
//   const handleLog = () => {
//     Notify.info("点击了子组件");
//   };
//   return (
//     <Button type="primary" onClick={handleLog}>
//       点击提醒
//     </Button>
//   );
// }
function UseRef(props: IProps) {
  const ref1 = useRef<HTMLInputElement>();
  const ref2 = useRef<HTMLElement>();
  const [value, setValue] = useState<string>("default");

  useEffect(() => {
    console.log(ref2, 'ref');
  }, [ref2]);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onNotice = () => {
    // @ts-ignore
    ref2.current.handleLog();
  };

  return (
    <div>
      <BlockHeader title="useRef使用"></BlockHeader>
      {/* @ts-ignore */}
      <input type="text" ref={ref1} value={value} onChange={onChange} />
      <BlockHeader title="子组件"></BlockHeader>
      {/* @ts-ignore */}
      <Child ref={ref2} value="子组件"></Child>
      {/* @ts-ignore */}
      <Button type="primary" onClick={onNotice}>
        点击操作子组件方法
      </Button>
    </div>
  );
}

export default UseRef;
