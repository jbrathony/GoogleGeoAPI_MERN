import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './MainIndex'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { Provider } from 'react-redux';
import configureStore from '../src/store/login';

ReactDOM.render(<Provider store={configureStore()} ><Main /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

