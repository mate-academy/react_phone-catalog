/* eslint-disable no-restricted-syntax */
import './App.scss';

import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductsPage';
import { Product, ProductType } from './types/product';
import { ProductDetailsPage } from './pages/ProductDetails';
import { FavouritesPage } from './pages/FavouritesPage';
import { ProductCart } from './pages/ProductCart';
import { TestPage } from './pages/TestPage';
import { useLocalStorage } from './utils/hooks/useLocalStorage';
import { Item } from './types/storageItem';
import { Storage } from './types/storages';

const App = () => {
  const [cart, setCart] = useLocalStorage<Item<Product>[]>([], Storage.CART);
  const [fav, setFav]
    = useLocalStorage<Item<Product>[]>([], Storage.FAVOURITES);

  // #region handlers
  const isIncluded = (items: Item<Product>[], value: Product) => {
    for (const item of items) {
      if (item.value.id === value.id) {
        return true;
      }
    }

    return false;
  };

  const handleSelectedClick = (value: Product) => {
    if (isIncluded(cart, value)) {
      setCart(prev => {
        return prev.filter(item => item.value.id !== value.id);
      });
    } else {
      setCart(prev => [...prev, { quantity: 1, value }]);
    }
  };

  const handleFavClick = (value: Product) => {
    if (isIncluded(fav, value)) {
      setFav(prev => {
        return prev.filter(item => item.value.id !== value.id);
      });
    } else {
      setFav(prev => [...prev, { quantity: 1, value }]);
    }
  };

  const handleDiscardItem = (item: Item<Product>) => {
    setCart(prev => {
      return prev.filter(prod => prod.value.id !== item.value.id);
    });
  };

  const handleQuantityDecrease = (item: Item<Product>) => {
    const newCart = [...cart];

    for (const product of newCart) {
      if (product.value.id === item.value.id) {
        product.quantity -= 1;
      }
    }

    setCart(newCart);
  };

  const handleQuantityIncrease = (item: Item<Product>) => {
    const newCart = [...cart];

    for (const product of newCart) {
      if (product.value.id === item.value.id) {
        product.quantity += 1;
      }
    }

    setCart(newCart);
  };
  // #endregion

  return (
    <>
      <Header
        cartLengh={cart.length}
        favLengh={fav.length}
      />

      <Routes>
        <Route path="/">
          <Route
            index
            element={(
              <HomePage
                cart={cart}
                fav={fav}
                isIncluded={isIncluded}
                onFavClick={handleFavClick}
                onSelectedClick={handleSelectedClick}
              />
            )}
          />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route
            path="phones"
          >
            <Route
              index
              element={(
                <ProductPage
                  productType={ProductType.PHONES}
                  cart={cart}
                  fav={fav}
                  isIncluded={isIncluded}
                  onFavClick={handleFavClick}
                  onSelectedClick={handleSelectedClick}
                />
              )}
            />
            <Route
              path=":itemId"
              element={(
                <ProductDetailsPage
                  cart={cart}
                  fav={fav}
                  isIncluded={isIncluded}
                  onSelectedClick={handleSelectedClick}
                  onFavClick={handleFavClick}
                />
              )}
            />
          </Route>

          <Route
            path="tablets"
          >
            <Route
              index
              element={(
                <ProductPage
                  productType={ProductType.TABLET}
                  cart={cart}
                  fav={fav}
                  isIncluded={isIncluded}
                  onFavClick={handleFavClick}
                  onSelectedClick={handleSelectedClick}
                />
              )}
            />
            <Route
              path=":itemId"
              element={(
                <ProductDetailsPage
                  cart={cart}
                  fav={fav}
                  isIncluded={isIncluded}
                  onSelectedClick={handleSelectedClick}
                  onFavClick={handleFavClick}
                />
              )}
            />
          </Route>

          <Route
            path="accessories"
          >
            <Route
              index
              element={(
                <ProductPage
                  productType={ProductType.ACCESSORY}
                  cart={cart}
                  fav={fav}
                  isIncluded={isIncluded}
                  onFavClick={handleFavClick}
                  onSelectedClick={handleSelectedClick}
                />
              )}
            />
            <Route
              path=":itemId"
              element={(
                <ProductDetailsPage
                  cart={cart}
                  fav={fav}
                  isIncluded={isIncluded}
                  onSelectedClick={handleSelectedClick}
                  onFavClick={handleFavClick}
                />
              )}
            />
          </Route>

          <Route
            path="favourites"
            element={(
              <FavouritesPage
                fav={fav}
                cart={cart}
                isIncluded={isIncluded}
                onFavClick={handleFavClick}
                onSelectedClick={handleSelectedClick}
              />
            )}
          />

          <Route
            path="cart"
            element={(
              <ProductCart
                cart={cart}
                onDiscardItem={handleDiscardItem}
                onQuantityDecrease={handleQuantityDecrease}
                onQuantityIncrease={handleQuantityIncrease}
              />
            )}
          />

          <Route path="/dev" element={<TestPage />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
};

export default App;
