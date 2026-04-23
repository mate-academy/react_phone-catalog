import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import { ItemsProvider } from './ItemsProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ItemsProvider>
      <App />
    </ItemsProvider>
  </Router>,
);
