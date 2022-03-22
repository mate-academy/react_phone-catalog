import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Layout } from './components/Layout';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { Accessories } from './pages/Accessories';
import { Favorites } from './pages/Favorites';
import { Home } from './pages/Home';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { useLocalStorage } from './components/LocalStorage';
import { requestAll } from './api';
import { Phone } from './components/ProductCard';
import { Cart } from './pages/Cart';

const App = () => {
  const [gadgetsList, setGadgetsList] = useState([]);
  const [favorite, setFavorite] = useLocalStorage([], 'favorite');
  const [cart, setCart] = useLocalStorage([], 'cart');

  const phonesList = gadgetsList.filter((phone: Phone) => phone.type === 'phone');
  const tabletsList = gadgetsList.filter((phone: Phone) => phone.type === 'tablet');
  const accessoriesList = gadgetsList.filter((phone: Phone) => phone.type === 'accessory');

  const fetchPhones = () => {
    return requestAll();
  };

  useEffect(() => {
    fetchPhones().then((list) => {
      setGadgetsList(list);
    });
  }, []);

  const handleFavorite = (id: string) => {
    if (favorite.find((item: string) => item === id)) {
      setFavorite((prev: string[]) => {
        return prev.filter(item => item !== id);
      });
    } else {
      setFavorite((prevState: string[]) => {
        const newArray = [...prevState, id];

        return newArray;
      });
    }
  };

  const handleCart = (id: string) => {
    if (cart.find((item: string) => item === id)) {
      setCart((prev: string[]) => {
        const newArray = prev.filter(item => item !== id);

        return newArray;
      });
    } else {
      setCart((prevState: string[]) => {
        const newArray = [...prevState, id];

        return newArray;
      });
    }
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={(
            <Layout
              favorite={favorite}
              cart={cart}
            />
          )}
        >
          <Route
            index
            element={(
              <Home
                favorite={favorite}
                cart={cart}
                gadgetsList={gadgetsList}
                handleCart={handleCart}
                handleFavorite={handleFavorite}
              />
            )}
          />
          <Route
            path="phones"
            element={(
              <Phones
                favorite={favorite}
                cart={cart}
                phonesList={phonesList}
                handleCart={handleCart}
                handleFavorite={handleFavorite}
              />
            )}
          />
          <Route
            path="favorites"
            element={(
              <Favorites
                gadgetsList={gadgetsList}
                handleCart={handleCart}
                handleFavorite={handleFavorite}
                favorite={favorite}
                cart={cart}
              />
            )}
          />
          <Route
            path="cart"
            element={(
              <Cart
                gadgetsList={gadgetsList}
                handleCart={handleCart}
                handleFavorite={handleFavorite}
                favorite={favorite}
                cart={cart}
              />
            )}
          />
          <Route
            path="phones/:id"
            element={(
              <ProductDetailsPage
                allGadgets={gadgetsList}
                favorite={favorite}
                cart={cart}
                gadgetsList={phonesList}
                type="Phones"
                handleCart={handleCart}
                handleFavorite={handleFavorite}
              />
            )}
          />
          <Route
            path="tablets"
            element={(
              <Tablets
                favorite={favorite}
                cart={cart}
                phonesList={tabletsList}
                handleCart={handleCart}
                handleFavorite={handleFavorite}
              />
            )}
          />
          <Route
            path="tablets/:id"
            element={(
              <ProductDetailsPage
                allGadgets={gadgetsList}
                favorite={favorite}
                cart={cart}
                gadgetsList={tabletsList}
                type="Tablets"
                handleCart={handleCart}
                handleFavorite={handleFavorite}
              />
            )}
          />
          <Route
            path="accessories"
            element={(
              <Accessories
                favorite={favorite}
                cart={cart}
                phonesList={accessoriesList}
                handleCart={handleCart}
                handleFavorite={handleFavorite}
              />
            )}
          />
          <Route
            path="accessories/:id"
            element={(
              <ProductDetailsPage
                allGadgets={gadgetsList}
                favorite={favorite}
                cart={cart}
                gadgetsList={accessoriesList}
                type="Accessories"
                handleCart={handleCart}
                handleFavorite={handleFavorite}
              />
            )}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
