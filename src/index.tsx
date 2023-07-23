import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { App } from './App';
import { persistor, store } from './Reducer/store';

import translations_ua from './locales/ua.json';
import translations_en from './locales/en.json';

i18n.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    ua: {
      translation: translations_ua,
    },
    en: {
      translation: translations_en,
    },
  },
});

export default i18n;

ReactDOM.render(
  <HashRouter>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </I18nextProvider>
  </HashRouter>,
  document.getElementById('root'),
);
