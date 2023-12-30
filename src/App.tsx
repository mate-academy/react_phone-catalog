import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Root } from './Root';
import { persistor, store } from './store/store';

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>
);
