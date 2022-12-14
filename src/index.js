import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from './App';
import * as serviceWorker from './serviceWorker';

//import './App.css';
import './assets/scss/style.scss';
import { Provider } from 'react-redux';
import {combineReducers  , createStore} from 'redux';
import userReducer from "./userSlice";

const history = createBrowserHistory();
const MainReducer = combineReducers({
  user:userReducer,
})

const store = createStore(MainReducer);

ReactDOM.render(
  <Router history={history}>
  <Provider store={store}>
    <App />
  </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
