import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { CartContextProvider } from './components/CartContext';
import { FavContextProvider } from './components/FavContext';
import './styles/main.scss';

ReactDOM.render(
  <CartContextProvider>
    <FavContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </FavContextProvider>
  </CartContextProvider>,
  document.getElementById('root'),
);
