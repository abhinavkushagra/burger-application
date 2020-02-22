import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducers from './store/reducers';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducers)

const load = (
   < Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>;
   </Provider >
)


ReactDOM.render(load, document.getElementById('root'));
