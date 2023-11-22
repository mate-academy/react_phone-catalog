import './App.scss';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clientGet } from './utils/fetchClient';
import { Product } from './types/productType';
import { Phones } from './Pages/Phones/Phones';
import { Tablets } from './Pages/Tablets/Tablets';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './Pages/HomePage/HomePage';
import { Loader } from './components/Loader';
import { Accessories } from './Pages/Accessories/Accessories';
import { Favorites } from './Pages/Favorites/Favorites';
import { Cart } from './Pages/Cart/Cart';
import { CartItem } from './types/cartType';
import { ProductDetailsPage } from './Pages/ProductDetiels/ProductDetails';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setIsLoading(true);
    clientGet<Product[]>()
      .then(setProducts)
      .catch(() => setErrorMessage('Something gone wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const phones = [...products].filter(product => (
    product.category === 'phones'
  ));

  const tablets = [...products].filter(product => (
    product.category === 'tablets'
  ));

  const accessories = [...products].filter(product => (
    product.category === 'accessories'
  ));

  return (
    <div className="App">
      <Header favorites={favorites} cartItems={cartItems} />
      <section className="section">
        {(isLoading && !errorMessage) && <Loader />}
        {(!isLoading && errorMessage) && (
          <h1 className="title">{errorMessage}</h1>
        )}
        {(!isLoading && !errorMessage) && (

          <div className="container">
            <Routes>
              <Route path="/">
                <Route
                  index
                  element={(
                    <HomePage
                      products={products}
                      phones={phones}
                      tablets={tablets}
                      accessories={accessories}
                      setFavorites={setFavorites}
                      favorites={favorites}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  )}
                />
                <Route
                  path=":productId"
                  element={(
                    <ProductDetailsPage
                      products={products}
                      setFavorites={setFavorites}
                      favorites={favorites}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  )}
                />
              </Route>
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="phones">
                <Route
                  index
                  element={(
                    <Phones
                      phones={phones}
                      setFavorites={setFavorites}
                      favorites={favorites}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  )}
                />
                <Route
                  path=":productId"
                  element={(
                    <ProductDetailsPage
                      products={products}
                      setFavorites={setFavorites}
                      favorites={favorites}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  )}
                />
              </Route>
              <Route path="tablets">
                <Route
                  index
                  element={(
                    <Tablets
                      tablets={tablets}
                      setFavorites={setFavorites}
                      favorites={favorites}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  )}
                />
                <Route
                  path=":productId"
                  element={(
                    <ProductDetailsPage
                      products={products}
                      setFavorites={setFavorites}
                      favorites={favorites}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  )}
                />
              </Route>
              <Route path="accessories">
                <Route
                  index
                  element={(
                    <Accessories
                      accessories={accessories}
                      setFavorites={setFavorites}
                      favorites={favorites}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  )}
                />
                <Route
                  path=":productId"
                  element={(
                    <ProductDetailsPage
                      products={products}
                      setFavorites={setFavorites}
                      favorites={favorites}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  )}
                />
              </Route>
              <Route path="favorites">
                <Route
                  index
                  element={(
                    <Favorites
                      favorites={favorites}
                      setFavorites={setFavorites}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  )}
                />
                <Route
                  path=":productId"
                  element={(
                    <ProductDetailsPage
                      products={products}
                      setFavorites={setFavorites}
                      favorites={favorites}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  )}
                />
              </Route>
              <Route
                path="cart"
                element={(
                  <Cart cartItems={cartItems} setCartItems={setCartItems} />
                )}
              />
              <Route
                path="*"
                element={
                  <h1 className="title">Page not found</h1>
                }
              />
            </Routes>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default App;
