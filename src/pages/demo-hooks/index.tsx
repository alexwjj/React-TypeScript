import "./index.less";
import React, { useState, useEffect } from "react";
import { Alert, Button } from "zent";
import CallbackDemo from "./useCallback";
import ContextDemo from "./useContext";
import ReducerDemo from "./useReducer";
// import useTime from "./useHooks.ts";
// Hooks.defaultProps = {
//   title: 'wjj'
// }

function Hooks(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const titleCache = document.title;
    document.title = `You clicked ${count} times`;

    return () => {
      document.title = titleCache;
    };
  }, [count]);
  // const [time, setTime] = useTime();

  return (
    <div>
      {/* {props.title} */}
      <Alert
        className="mt10"
        title="useCallback/useMemo"
        description="useCallback主要用于函数的缓存，依赖项不变返回的函数的引用地址不变，uesMemo是针对值的缓存。都是为了避免组件的重复渲染"
      ></Alert>
      <CallbackDemo></CallbackDemo>
      <Alert
        title="useContext"
        className="mt10"
        description="useContext 共享状态, 创建一个包含一些状态的父级，子级都可以共享这个状态"
      ></Alert>
      <ContextDemo></ContextDemo>

      <Alert
        className="mt10"
        title="useEffect"
        description="useEffect,副作用,最常见的就是向服务器请求数据。
      以前，放在componentDidMount里面的代码，现在可以放在useEffect(() => { return func },[dep])。
      第二个参数如果不传，每次组件渲染都会执行,第一个函数内return一个函数，相当于componentWillUnmount"
      ></Alert>
      <p>You clicked {count} times</p>
      <Button type="primary" onClick={() => setCount(count + 1)}>
        点击测试useEffect
      </Button>

      <Alert
        className="mt10"
        title="useReducer"
        description="useReducer 状态管理, const [state, dispatch] = useReducer(reducer, initialState);"
      ></Alert>
      <ReducerDemo></ReducerDemo>

      <Alert
        className="mt10"
        title="自定义Hooks"
        description="基于原有的一些hooks可以进行进一步的封装"
      ></Alert>
      {/* <Button type="primary" onClick={setTime}>
        点击测试useTime, 获取最新事件
      </Button>
      <div>{time}</div> */}
    </div>
  );
}


export default Hooks;
