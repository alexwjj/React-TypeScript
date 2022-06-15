/*
 * @Descripttion:
 * @version:
 * @Author: alexwjj
 * @Date: 2020-10-14 21:16:42
 * @LastEditors: alexwjj
 * @LastEditTime: 2021-01-28 00:02:53
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
