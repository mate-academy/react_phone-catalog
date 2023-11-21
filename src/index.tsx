import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './app/store';
import { Root } from './Root';
import { Loader } from './components/Loader/Loader';

const PGate = PersistGate as any;

ReactDOM.render(
  <Provider store={store}>
    <PGate loading={<Loader />} persistor={persistor}>
      <Root />
    </PGate>
  </Provider>,
  document.getElementById('root'),
);
