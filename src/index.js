import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducers from './store/reducers/reducers'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(thunk)));

const load = (
   < Provider store = {store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>;
   </Provider >
)


ReactDOM.render(load, document.getElementById('root'));
