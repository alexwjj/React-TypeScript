import './index.less';
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState('2021-03-15');

  useEffect(() => {
    document.title = `You clicked ${count} times`;

	return ()=> {
		console.log('11111');
	}
  }, [count, time]);

  return (
    <div>
      <p>今天是{time}</p>
      <button onClick={() => setTime('3-16')}>
        next days
      </button>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Example;
