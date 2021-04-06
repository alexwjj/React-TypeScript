import React, { useReducer } from "react";
import { Button } from "zent";

const myReducer = (state, action) => {
  switch(action.type) {
    case('countUp'):
      return {
        ...state,
        count: state.count + 1
      }
      case('countDown'):
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}

function ReducerDemo() {
  const [state, dispatch] = useReducer(myReducer, { count: 0 })

  return (
    <div className="App">
      <Button type="primary" onClick={() => dispatch({ type: 'countUp' })}>
        +1
      </Button>
      <Button type="primary" onClick={() => dispatch({ type: 'countDown' })}>
        -1
      </Button>
      <p>Count: {state.count}</p>
    </div>
  );
}


export default ReducerDemo;
