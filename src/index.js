import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import reducers from "./store/reducers";
import { requestMiddleware } from './helpers/redux-request'
import './assets/CSS/style.css';
import './assets/CSS/header.css';
import './assets/CSS/footer.css';
import './assets/CSS/components/product.css';
import './assets/CSS/media_320.css';
import './assets/CSS/media_480.css';
import './assets/CSS/media_769.css';
import './assets/CSS/media_1024.css';
import Modal from 'react-modal';

Modal.setAppElement(document.body)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(requestMiddleware))
);

requestMiddleware.on.fail = ((err) => {
  if (err.response){
    return err.response;
  }
  throw err;
});

window.store = store;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
