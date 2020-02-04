import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const load = <BrowserRouter>
                <App/>
             </BrowserRouter> ;

ReactDOM.render(load, document.getElementById('root'));
