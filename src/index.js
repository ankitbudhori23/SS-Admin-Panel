import React,  { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store'
import { Provider } from 'react-redux'
import SuspenseContent from './containers/SuspenseContent';
import {
  BrowserRouter as Router,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={<SuspenseContent />}>
        <Provider store={store}>
            <Router>
            <App />
            </Router>
        </Provider>
    </Suspense>
);

