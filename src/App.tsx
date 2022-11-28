import {
  Route,
  Routes,
} from 'react-router-dom';
import { Home } from './components/Home';
import { Nav } from './components/Nav';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/App.scss';
import { Footer } from './components/Footer';
import { ProductInfo } from './components/ProduktInfo';
import { ProductPage } from './components/ProductPage';
import { Favorites } from './components/Favorites';
import { Cart } from './components/Cart';
// import { ProductType } from './types/Product';

const App = () => {
  return (
    <div className="App">
      <Nav />

      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="phones"
            >
              <Route index element={<ProductPage />} />
              <Route
                path=":selektedProduct"
                element={<ProductInfo />}
              />
            </Route>
            <Route
              path="tablets"
            >
              <Route index element={<ProductPage />} />
              <Route
                path=":selektedProduct"
                element={<ProductInfo />}
              />
            </Route>
            <Route
              path="accessories"
              element={<ProductPage />}
            />
            <Route
              path="favorites"
              element={<Favorites />}
            />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<main><h1>Page not found</h1></main>} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
