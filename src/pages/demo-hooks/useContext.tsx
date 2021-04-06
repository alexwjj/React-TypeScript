import "./index.less";
import React, { useState, useEffect, useCallback } from "react";
import { Button, Notify, Tag, Radio } from "zent";

function Child({ onClick }) {
  const [list, setList] = useState<number[]>([]);
  useEffect(() => {
    setList(onClick());
    Notify.info("子组件渲染");
  }, [onClick]);

  return (
    <div>
      {list.map((item, index) => {
        return (
          <div key={index}>
            <Tag>列表：{item}</Tag>;
          </div>
        );
      })}
    </div>
  );
}

function CallbackDemoAdd() {
  const [count, setCount] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [isUseCallback, setIsUse] = useState<boolean>(false);
  const show = () => {
    return [count, count + 1, count + 2];
  };

  const showUse = useCallback(() => {
    return [count, count + 1, count + 2];
  }, [count]);

  const onChange = (e) => {
    setIsUse(e.target.value);
  };

  return (
    <div>
      <div>
        点击两个按钮，都会触发子组件的重新渲染，但是child组件只依赖于count，也就是只有count变化的时候才去重新渲染。
      </div>
      <div>
        <Radio.Group onChange={onChange} value={isUseCallback}>
          <Radio value={false}>不使用</Radio>
          <Radio value={true}>使用useCallback</Radio>
        </Radio.Group>
      </div>

      <Button
        type="primary"
        onClick={() => {
          setCount(count + 1);
        }}
      >
       点击count+1 {count} 
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setValue(value + 1);
        }}
      >
        点击value+1 {value}
      </Button>
      <Child onClick={isUseCallback ? showUse : show}></Child>
    </div>
  );
}

export default CallbackDemoAdd;
