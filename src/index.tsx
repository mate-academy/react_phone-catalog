import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './styles/reset.scss';
import { Provider } from 'react-redux';
import store from './features/store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
