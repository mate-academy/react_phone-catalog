import { HashRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AppContext } from './context/AppContext';
import { FavoritesProvider } from './context/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <FavoritesProvider>
      <AppContext>
        <App />
      </AppContext>
    </FavoritesProvider>
  </Router>,
);
