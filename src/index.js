import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import { Provider } from 'react-redux'

import App from './App';
import reducer from './store/reducers/burgerBuilder'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


const app = (
  <Provider store={store}>    
      <App />
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
