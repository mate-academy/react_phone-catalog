import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import './utils/normalize.scss';
import { useState, useEffect } from 'react';
import { HeadNavigation } from './components/HeadNavigation/HeadNavigation';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFound } from './pages/NotFoundPage/NotFound';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { Phone } from './types/Phone';
import { getPhones } from './helpers/fetchPhones';
import { Loader } from './components/Loader/Loader';
import { FootNavigation } from './components/FootNavigation/FootNavigation';
import { PhoneDetails } from './pages/PhoneDetailsPage/PhoneDetails';
import { Favourites } from './pages/FavouritesPage/Favourites';
import { Cart } from './pages/CartPage/Cart';
import { CartItem } from './types/CartItem';

const App = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(phones);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProducts, setLikedProducts] = useState<Phone[]>([]);
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

  const loadProducts = async () => {
    setIsLoading(true);

    try {
      const productsFromServer = await getPhones();

      setPhones(productsFromServer);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const savedLikedProducts = localStorage.getItem('likedProducts');

    if (savedLikedProducts) {
      setLikedProducts(JSON.parse(savedLikedProducts));
    }
  }, []);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');

    if (savedCartItems) {
      setCartProducts(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <div className="page">
      <HeadNavigation
        phones={phones}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSearchResults={setSearchResults}
        setPhones={setPhones}
        likedProducts={likedProducts}
        cartProducts={cartProducts}
        setLikedProducts={setLikedProducts}
      />

      {(isLoading) ? <Loader /> : (
        <>
          <div className="main">
            <Routes>
              <Route
                path="/"
                element={(
                  <HomePage
                    phones={phones}
                    likedProducts={likedProducts}
                    setLikedProducts={setLikedProducts}
                    cartProducts={cartProducts}
                    setCartProducts={setCartProducts}
                  />
                )}
              />
              <Route
                path="home"
                element={
                  <Navigate to="/" replace />
                }
              />

              <Route path="/phones">
                <Route
                  index
                  element={(
                    <PhonesPage
                      phones={phones}
                      setPhones={setPhones}
                      searchResults={searchResults}
                      searchQuery={searchQuery}
                      likedProducts={likedProducts}
                      setLikedProducts={setLikedProducts}
                      cartProducts={cartProducts}
                      setCartProducts={setCartProducts}
                    />
                  )}
                />
                <Route
                  path=":productId"
                  element={(
                    <PhoneDetails
                      phones={phones}
                      likedProducts={likedProducts}
                      setLikedProducts={setLikedProducts}
                      cartProducts={cartProducts}
                      setCartProducts={setCartProducts}
                    />
                  )}
                />
              </Route>

              <Route path="/tablets">
                <Route index element={<TabletsPage />} />
                <Route
                  path=":productId"
                  element={<TabletsPage />}
                />
              </Route>

              <Route path="/accessories">
                <Route index element={<AccessoriesPage />} />
                <Route
                  path=":productId"
                  element={<AccessoriesPage />}
                />
              </Route>

              <Route path="/favourites">
                <Route
                  index
                  element={(
                    <Favourites
                      likedProducts={likedProducts}
                      setLikedProducts={setLikedProducts}
                      cartProducts={cartProducts}
                      setCartProducts={setCartProducts}
                    />
                  )}
                />
              </Route>

              <Route path="/shoppingBag">
                <Route
                  index
                  element={(
                    <Cart
                      cartProducts={cartProducts}
                      setCartProducts={setCartProducts}
                    />
                  )}
                />
              </Route>

              <Route
                path="*"
                element={
                  <NotFound />
                }
              />
            </Routes>
          </div>
        </>
      )}

      <FootNavigation />
    </div>
  );
};

export default App;
