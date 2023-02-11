import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { CartAndFavProvider } from './context/CartAndFavContext';
import { DetailedProductProvider } from './context/DetailedProductContext';

ReactDOM.render(
  <Router>
    <CartAndFavProvider>
      <DetailedProductProvider>
        <App />
      </DetailedProductProvider>
    </CartAndFavProvider>
  </Router>,
  document.getElementById('root'),
);
