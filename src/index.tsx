import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import '../src/style/_main.scss';
import { Providers } from './contexts/Providers';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Providers>
      <App />
    </Providers>
  </Router>,
);
