import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { CartFavoritesProvider } from './providers/CartFavoritesProvider';

ReactDOM.render(
  <Router>
    <CartFavoritesProvider>
      <App />
    </CartFavoritesProvider>
  </Router>,
  document.getElementById('root'),
);
