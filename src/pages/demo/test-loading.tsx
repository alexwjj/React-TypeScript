import * as React from "react";
import withLoading from './withLoading';

const TestLoading: React.FC<any> = (props) => {
  let [loadingOut, setLoadingOut] = React.useState<boolean>(false);
  React.useEffect(() => {
    setTimeout(() => {
      setLoadingOut(true);
    }, 3000);
  }, []);
  return <>{loadingOut ? <h1>loading结束</h1> : <h1>loading中</h1>}</>;
};

const Loading = () => <p>loading</p>;

export default withLoading(Loading)(TestLoading)
