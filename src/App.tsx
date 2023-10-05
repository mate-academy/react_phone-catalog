/* eslint-disable no-mixed-operators */
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles/blocks/App.scss';
import './styles/utils/variables.scss';

import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPages';
import { getProducts, productsURL } from './api/products';
import { Product } from './types/product';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { Cart } from './types/cart';
import { Favorites } from './pages/Favorites';
import { Footer } from './components/Footer/Footer';

const getLocalStorage = (value: string) => {
  const fromLocalStorage = localStorage.getItem(value);
  const parsed = fromLocalStorage
    ? JSON.parse(fromLocalStorage) : [];

  return Array.isArray(parsed) ? parsed : [];
};

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isPageBiggerThanWindow, setIsPageBiggerThanWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [carts, setCarts] = useState<Cart[]>(getLocalStorage('carts'));
  const [favorites, setFavorites]
  = useState<Product[]>(getLocalStorage('favorites'));
  const [query, setQuery] = useState('');

  const handleSetCarts = (value: Product) => {
    if (!carts.some(cart => cart.id === value.id)) {
      setCarts(carts.concat({
        imageUrl: value.imageUrl,
        name: value.name,
        id: value.id,
        price: value.discount > 0
          ? value.price - (value.price / 100 * value.discount) : value.price,
        quantity: 1,
      }));
    } else {
      setCarts(carts.filter(cart => cart.id !== value.id));
    }
  };

  const deleteCart = (value: Cart) => {
    setCarts(carts.filter(cart => cart.id !== value.id));
  };

  const addQuantity = (value: Cart) => {
    setCarts(carts.map(cart => {
      return cart.id === value.id
        ? { ...cart, quantity: cart.quantity + 1 } : { ...cart };
    }));
  };

  const subtractQuantity = (value: Cart) => {
    setCarts(carts.map(cart => {
      return cart.id === value.id
        ? { ...cart, quantity: cart.quantity - 1 } : { ...cart };
    }));
  };

  const handleSetFavorites = (value: Product) => {
    if (favorites.some(favorit => favorit.id === value.id)) {
      setFavorites(favorites.filter(favorit => favorit.id !== value.id));
    } else {
      setFavorites(favorites.concat(value));
    }
  };

  const handleSetQuery = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    localStorage.setItem('carts', JSON.stringify(carts));
  }, [carts]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const updatePageHeight = () => {
    const pageHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );
    const windowHeight = window.innerHeight;

    setIsPageBiggerThanWindow(pageHeight !== windowHeight);
  };

  window.addEventListener('resize', updatePageHeight);
  window.addEventListener('scroll', updatePageHeight);
  window.addEventListener('load', updatePageHeight);

  const handeSetIsLoadin = (value: boolean) => {
    setIsLoading(value);
  };

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const data = await getProducts(productsURL);

        setProducts(data);
      } catch (error) {
        throw new Error('Error downloading data');
      }

      setIsLoading(false);
    }

    fetchProducts();
  }, []);

  return (
    <div className="container" id="home">
      <div className="section">
        <Header
          favorites={favorites}
          carts={carts}
          handleSetQuery={handleSetQuery}
          query={query}
        />
        <div className="main">
          <Routes>
            <Route
              path="/"
              element={(
                <HomePage
                  products={products}
                  updatePageHeight={updatePageHeight}
                  isLoading={isLoading}
                  handleSetCarts={handleSetCarts}
                  carts={carts}
                  handleSetFavorites={handleSetFavorites}
                  favorites={favorites}
                />
              )}
            />
            <Route
              path="/phones"
              element={(
                <PhonesPage
                  products={products}
                  updatePageHeight={updatePageHeight}
                  isLoading={isLoading}
                  handleSetCarts={handleSetCarts}
                  carts={carts}
                  handleSetFavorites={handleSetFavorites}
                  favorites={favorites}
                  query={query}
                  handleSetQuery={handleSetQuery}
                />
              )}
            >
              <Route index element={PhonesPage} />
              <Route path=":productID" element={PhonesPage} />
            </Route>
            <Route
              path="/tablets"
              element={(
                <TabletsPage
                  products={products}
                  updatePageHeight={updatePageHeight}
                  isLoading={isLoading}
                  handleSetCarts={handleSetCarts}
                  carts={carts}
                  handleSetFavorites={handleSetFavorites}
                  favorites={favorites}
                  query={query}
                  handleSetQuery={handleSetQuery}
                />
              )}
            />
            <Route
              path="/accessories"
              element={(
                <AccessoriesPage
                  products={products}
                  updatePageHeight={updatePageHeight}
                  isLoading={isLoading}
                  handleSetCarts={handleSetCarts}
                  carts={carts}
                  handleSetFavorites={handleSetFavorites}
                  favorites={favorites}
                  query={query}
                  handleSetQuery={handleSetQuery}
                />
              )}
            />
            <Route
              path="/product"
              element={(
                <ProductPage
                  products={products}
                  updatePageHeight={updatePageHeight}
                  isLoading={isLoading}
                  setIsLoading={handeSetIsLoadin}
                  handleSetCarts={handleSetCarts}
                  carts={carts}
                  handleSetFavorites={handleSetFavorites}
                  favorites={favorites}
                />
              )}
            >
              <Route index element={ProductPage} />
              <Route path=":productID" element={ProductPage} />
            </Route>
            <Route
              path="/cart"
              element={(
                <CartPage
                  carts={carts}
                  isLoading={isLoading}
                  deleteCart={deleteCart}
                  addQuantity={addQuantity}
                  subtractQuantity={subtractQuantity}
                />
              )}
            />
            <Route
              path="/favorites"
              element={(
                <Favorites
                  isLoading={isLoading}
                  handleSetCarts={handleSetCarts}
                  carts={carts}
                  handleSetFavorites={handleSetFavorites}
                  favorites={favorites}
                  query={query}
                  handleSetQuery={handleSetQuery}
                  updatePageHeight={updatePageHeight}
                />
              )}
            />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route
              path="*"
              element={(
                <NotFoundPage
                  updatePageHeight={updatePageHeight}
                />
              )}
            />
          </Routes>
        </div>
      </div>

      <Footer isPageBiggerThanWindow={isPageBiggerThanWindow} />
    </div>
  );
};

export default App;
