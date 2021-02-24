import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import App from './App';
import './index.css';
import rootReducer from './reducers/root_reducer'

const store = createStore(rootReducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
