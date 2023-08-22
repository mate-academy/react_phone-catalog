import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Root } from './Root';

import i18n from './i18n';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Root />
  </I18nextProvider>,
  document.getElementById('root'),
);
