import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import { store } from './store/redux-store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
