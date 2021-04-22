import * as React from 'react';

const Test: React.FC<any> = (props) => {
    return (
        <>
        <div>测试props.children</div>
        <div>{props.children}</div>
        </>
    )
}

export default Test