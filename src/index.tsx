import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/index.scss';
import { ScrollToTop } from './shared/ScrollToTop/ScrollToTop';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </Provider>,
);
