import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
// import { HomePage } from './pages/HomePage';
// import { ProductPage } from './pages/ProductsPage';
// import { ProductType } from './types/product';
// import { ProductDetailsPage } from './pages/ProductDetails';
// import { FavouritesPage } from './pages/FavouritesPage';
// import { ProductCart } from './pages/ProductCart';
// import { TestPage } from './pages/TestPage';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root'),
);
