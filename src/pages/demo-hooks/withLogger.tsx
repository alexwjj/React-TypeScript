import * as React from "react";

const withLogger = (prefix = "") => (WrappedComponent) => {
  const WithLogger = (props) => {
    console.log(`${prefix}[Props]:`, props);
    return <WrappedComponent {...props} />;
  };
  return WithLogger;
};

export default withLogger;
