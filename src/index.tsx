import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
