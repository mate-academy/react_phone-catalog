import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
} from 'react-router-dom';

import { CartContextProvider } from './contexts/CartContextProvider';
import { FavoriteContextProvider } from './contexts/FavoriteContextProvider';
import App from './App';

import './styles/main.scss';

ReactDOM.render(
  <Router>
    <CartContextProvider>
      <FavoriteContextProvider>
        <App />
      </FavoriteContextProvider>
    </CartContextProvider>
  </Router>,
  document.getElementById('root'),
);
