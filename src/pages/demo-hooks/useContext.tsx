import React, { useContext, useState } from "react";
import { Button } from "zent";
interface IUser {
  username: string;
}

const AppContext = React.createContext({ username: "" });

const Navbar = () => {
  const { username } = useContext<IUser>(AppContext);

  return (
    <div className="navbar">
      <h1>子组件 username 001:{username}</h1>
    </div>
  );
};

const Messages = () => {
  const { username } = useContext(AppContext);

  return (
    <div className="messages">
      <h1>子组件 username 002:{username}</h1>
    </div>
  );
};

function ContextDemo() {
  const [user, setUser] = useState({ username: "lxy" });
  return (
    <AppContext.Provider value={user}>
      <div className="App">
        父组件传递了一个默认username：lxy
        <div>
          <Button type="primary" onClick={() => setUser({ username: "wujunjie" })}>
            点击修改公共值username 为wujunjie
          </Button>
        </div>
        <Navbar />
        <Messages />
      </div>
    </AppContext.Provider>
  );
}

export default ContextDemo;
