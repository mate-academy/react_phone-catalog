import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { HashRouter as Router } from 'react-router-dom';

import { Root } from './Root';

import i18n from './i18n';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Router>
      <Root />
    </Router>
  </I18nextProvider>,
  document.getElementById('root'),
);
