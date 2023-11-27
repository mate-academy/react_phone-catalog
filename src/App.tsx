import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import {
  HomePage,
  CartPage,
  FavouritesPage,
  ProductDetailsPage,
  ProductsPage,
  ContactsPage,
  RightsPage,
  NotFoundPage,
} from './components/pages/index';

import { Header, Footer } from './components/index';
import { Cart } from './utils/types/Cart';
import { Product } from './utils/types/Product';
import { Context } from './utils/Context';
import { getProducts } from './utils/getProducts';
import { categories } from './utils/listsNames';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartList, setCartList] = useState<Cart[]>([]);
  const [favourites, setFavouritesList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const { pathname } = useLocation();

  const editCartItem = (itemToEdit: Cart, num: number | null) => {
    if (num) {
      setCartList(cartList
        .map((item) => (item.id === itemToEdit.id
          ? {
            ...item,
            quantity: item.quantity + num,
          }
          : item)));

      return;
    }

    setCartList(prev => (prev.some(cart => cart.id === itemToEdit.id)
      ? prev.filter(cartItem => cartItem.id !== itemToEdit.id)
      : [...prev, itemToEdit]));
  };

  const addFavourite = (item: Product) => {
    setFavouritesList(prev => {
      return prev.includes(item)
        ? prev.filter(favourite => favourite.id !== item.id)
        : [...prev, item];
    });
  };

  useEffect(() => {
    const localFavourites = localStorage.getItem('favourites');
    const localCartList = localStorage.getItem('cart');

    if (localCartList) {
      setCartList(JSON.parse(localCartList));
    }

    if (localFavourites) {
      setFavouritesList(JSON.parse(localFavourites));
    }

    getProducts()
      .then(responce => setProducts(responce))
      .catch(() => setisError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => localStorage
    .setItem('favourites', JSON.stringify(favourites)), [favourites]);
  useEffect(() => localStorage
    .setItem('cart', JSON.stringify(cartList)), [cartList]);

  const path = categories.find(item => pathname.includes(item)) || 'phones';

  return (
    <Context.Provider value={{
      editCartItem,
      cartList,
      addFavourite,
      favourites,
      isLoading,
    }}
    >
      <div className="App">
        <Header />

        <div className="page-container">
          {isError
              && (
                <div className="error">
                  Failed to download Product list
                </div>
              )}
          <Routes>

            <Route
              path="/"
              element={(
                <HomePage
                  products={products}
                />
              )}
            />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route>
              <Route path={path}>
                <Route
                  index
                  element={<ProductsPage products={products} />}
                />
                <Route
                  path=":id"
                  element={<ProductDetailsPage products={products} />}
                />
              </Route>
            </Route>

            <Route
              path="cart"
              element={(
                <CartPage />
              )}
            />
            <Route
              path="favourites"
              element={(
                <FavouritesPage />
              )}
            />

            <Route
              path="contacts"
              element={(
                <ContactsPage />
              )}
            />

            <Route
              path="rights"
              element={(
                <RightsPage />
              )}
            />

            <Route
              path="*"
              element={<NotFoundPage />}
            />

          </Routes>
        </div>
      </div>
      <Footer />
    </Context.Provider>
  );
};

export default App;
