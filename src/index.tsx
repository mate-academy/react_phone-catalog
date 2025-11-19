import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
    <ScrollToTop />
  </HashRouter>,
);
