import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './core/reducer';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
