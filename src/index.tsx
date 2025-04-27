import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './App';
import './i18n';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  );
