import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import App from './containers/appContainer';
import store from './store';
import { HOME_CAR } from './constants/carConstants';

ReactDOM.render(
  <Provider store = { store }>
    <App viewToDisplay = { HOME_CAR }
    />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
