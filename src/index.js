import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './views/App'
import reducers from './redux/reducers'
import './static/index.css';
// import registerServiceWorker from './utils/registerServiceWorker';

// store
const store = createStore(reducers)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));
// registerServiceWorker();


