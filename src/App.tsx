import './App.scss';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPhones } from './api/api';
import { useLocalStorage } from './helpers/useLocalStorage';
import { Product } from './types/Product';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NotPage } from './pages/NotPage';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/Accessories';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
// import { useAppDispatch, useAppSelector } from './helpers/hooks';

export const App: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  // const dispatch = useAppDispatch();
  // const cartItems = useAppSelector(state => state.cartItems);

  const addProductToCart = (cartItem: Product) => {
    setCartItems([...cartItems, cartItem]);
  };

  const removeProductFromCart = (cartItemId: string) => {
    setCartItems(cartItems.filter(
      (item: Product) => item.phoneId !== cartItemId,
    ));
  };

  const getPhonesFromServer = async () => {
    try {
      const phonesFromServer = await getPhones();

      setPhones(phonesFromServer);
    } catch {
      throw new Error('Unable to upload phones');
    }
  };

  useEffect(() => {
    getPhonesFromServer();
  }, []);

  return (
    <>
      <div className="page">
        <Header cartItems={cartItems} />

        <main className="page__content">
          <Routes>
            <Route
              path="*"
              element={<NotPage />}
            />

            <Route
              path="/"
              element={
                <HomePage
                  products={phones}
                  addProductToCart={addProductToCart}
                />
              }
            />

            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />
            
            <Route path="/phones">
              <Route
                index
                element={
                  <PhonesPage
                    phones={phones}
                    addProductToCart={addProductToCart}
                  />
                }
              />
              
              <Route
                path=":productId"
                element={
                  <ProductDetailsPage
                    phones={phones}
                    addProductToCart={addProductToCart}
                  />
                }
              />
            </Route>
            
            <Route
              path="tablets" 
              element={
                <TabletsPage tablets={[]} />
              }
            />
            
            <Route
              path="accessories"
              element={
                <AccessoriesPage accessories={[]} />
              }
            />
            
            <Route
              path="favourites"
              element={<FavouritesPage />}
            />

            <Route
              path="cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  removeProductFromCart={removeProductFromCart}
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
};
