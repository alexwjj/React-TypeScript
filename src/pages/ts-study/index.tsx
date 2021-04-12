import React from "react";
import { Alert } from "zent";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import apiMd from "./tstype.md";
import CodeBlock from "./code-block";

export const TS: React.FC<any> = () => {
  const [text, setText] = React.useState("## text");
  React.useEffect(() => {
    fetch(apiMd)
      .then((res) => res.text())
      .then((text) => setText(text));
  }, []);
  return (
    <>
      <Alert title="typeScript" description="typeScript utility type"></Alert>
      <ReactMarkdown
        source={text}
        escapeHtml={false}
        renderers={{
          code: CodeBlock,
        }}
      />
    </>
  );
};

export default TS;
