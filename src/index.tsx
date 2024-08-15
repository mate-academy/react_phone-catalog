import { createRoot } from 'react-dom/client';

import { HashRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { Root } from './routes/index';
import { store } from './store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Provider store={store}>
      <Root />
    </Provider>
  </Router>,
);
