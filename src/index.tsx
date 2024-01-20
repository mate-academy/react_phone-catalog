import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Root } from './Root';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'),
);
