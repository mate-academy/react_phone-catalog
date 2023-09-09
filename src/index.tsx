import ReactDOM from 'react-dom';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { Root } from './Root';
import store from './app/store';

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'),
);
