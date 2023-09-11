import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
} from 'react-router-dom';

import { CartContextProvider } from './contexts/CartContextProvider';
import { FavouriteContextProvider } from './contexts/FavouriteContextProvider';
import App from './App';

import './styles/main.scss';

ReactDOM.render(
  <Router>
    <CartContextProvider>
      <FavouriteContextProvider>
        <App />
      </FavouriteContextProvider>
    </CartContextProvider>
  </Router>,
  document.getElementById('root'),
);
