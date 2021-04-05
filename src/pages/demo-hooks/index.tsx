import "./index.less";
import React, { useState, useEffect } from "react";
import { Alert } from "zent";
import CallbackDemo from "./useCallback";

function Hooks() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;

    return () => {
      console.log("11111");
    };
  }, [count]);

  return (
    <div>
      <Alert
        title="useCallback/useMemo"
        description="useCallback主要用于函数的缓存，依赖项不变返回的函数的引用地址不变，uesMemo是针对值的缓存。都是为了避免组件的重复渲染"
      ></Alert>
      <CallbackDemo></CallbackDemo>
      <Alert title="useEffect" description=""></Alert>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Hooks;
