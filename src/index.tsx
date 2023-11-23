import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistore, store } from './Reducers/store';
import { App } from './App';

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <App />
      </PersistGate>
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);
