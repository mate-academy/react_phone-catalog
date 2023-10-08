import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import { CartContextProvider } from './components/contexts/CartContextProvider';
import { FavContextProvider } from './components/contexts/FavContextProvider';

ReactDOM.render(
  <Router>
    <CartContextProvider>
      <FavContextProvider>
        <App />
      </FavContextProvider>
    </CartContextProvider>
  </Router>,
  document.getElementById('root'),
);
