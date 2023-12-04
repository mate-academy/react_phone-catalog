import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { CartFavoritesProvider } from './providers/CartFavoritesProvider';

const rootElement = document.getElementById('root') as HTMLElement;

const root = (ReactDOM as any).createRoot(rootElement);

root.render(
  <Router>
    <CartFavoritesProvider>
      <App />
    </CartFavoritesProvider>
  </Router>,
);
