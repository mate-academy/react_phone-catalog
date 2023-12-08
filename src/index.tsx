import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import store, { persistor } from './app/store';

ReactDOM.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </PersistGate>,
  document.getElementById('root'),
);
