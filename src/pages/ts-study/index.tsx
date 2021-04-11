import React from 'react';
import { Alert } from 'zent';
import ReactMarkdown from 'react-markdown'
// import apiMd from "./tstype.md";


export const TS: React.FC<any> = () => {
  const input = '# This is a header\n\nAnd this is a paragraph'
  return (
    <>
    <Alert title="typeScript" description="练习"></Alert>
    <ReactMarkdown source={input} />
    </>
  );
};

export default TS;
