// import { Button } from 'zent';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// 引入样式
import 'zent/css/index.css';

import Login from './pages/login'
import Home from './pages/home'
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/login" component={Login} exact></Route>
          <Route path="/home" component={Home} exact></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
