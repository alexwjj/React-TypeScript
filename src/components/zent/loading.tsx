import { InlineLoading } from "zent";
import * as React from "react";
export const JLoading: React.FC = () => {
  return (
    <div >
      <InlineLoading loading />
      <InlineLoading
        loading
        icon="circle"
        iconText="加载中"
        textPosition="right"
      />
      <InlineLoading loading icon="circle" colorPreset="grey" />
    </div>
  );
};
