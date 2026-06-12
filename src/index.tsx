import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/index.scss';
import { HashRouter as Router } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ScrollToTop />
    <App />
  </Router>,
);
