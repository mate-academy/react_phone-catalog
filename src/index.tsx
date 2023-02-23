import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import { CartAndFavProvider } from './context/CartAndFavContext';
import { DetailedProductProvider } from './context/DetailedProductContext';
import { SortAndPagesProvider } from './context/sortAndPagesContext';

ReactDOM.render(
  <Router>
    <CartAndFavProvider>
      <DetailedProductProvider>
        <SortAndPagesProvider>
          <App />
        </SortAndPagesProvider>
      </DetailedProductProvider>
    </CartAndFavProvider>
  </Router>,
  document.getElementById('root'),
);
