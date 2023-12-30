import { Provider } from 'react-redux';
import { Root } from './Root';
import { store } from './store/store';

export const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);
