import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { persistor, store } from './Reducer/store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
