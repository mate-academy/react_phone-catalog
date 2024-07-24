import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import { GlobalStateProvider } from './modules/utils/GlobalStateProvider';
import { ScrollToTop } from './modules/shared/components/ScrollToTop';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <GlobalStateProvider>
      <ScrollToTop />
      <App />
    </GlobalStateProvider>
  </Router>,
);
