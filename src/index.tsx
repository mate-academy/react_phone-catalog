import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import './styles/index.scss';
import { ScrollToTop } from './shared/ScrollToTop/ScrollToTop';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Provider store={store}>
    <Router>
      <PersistGate loading={null} persistor={persistor}>
        <ScrollToTop />
        <App />
      </PersistGate>
    </Router>
  </Provider>,
);
