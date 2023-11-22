import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import { CartContextProvider } from './components/contexts/CartContextProvider';
import { FavContextProvider } from './components/contexts/FavContextProvider';
import {
  CardWidthContextProvider,
} from './components/contexts/CardWidthContextProvider';

ReactDOM.render(
  <Router>
    <CartContextProvider>
      <FavContextProvider>
        <CardWidthContextProvider>
          <App />
        </CardWidthContextProvider>
      </FavContextProvider>
    </CartContextProvider>
  </Router>,
  document.getElementById('root'),
);
