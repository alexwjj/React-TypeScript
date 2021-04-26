import * as React from "react";

const withLoading = (Loading) => (WapperedComponent) => {
  const WithLoading = (props) => {
    console.log(props);
    return props.loading ? (
      <Loading />
    ) : (
      <WapperedComponent {...props} />
    );
  };
  return WithLoading;
};

export default withLoading;
