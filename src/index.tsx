import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Root } from './Root';

import i18n from './i18n';
import { store } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <Router>
        <Root />
      </Router>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root'),
);
