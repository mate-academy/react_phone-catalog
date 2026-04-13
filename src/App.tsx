import './App.scss';
import Home from './pages/homePage/Home';
import Phones from './pages/phonesPage/Phones';
import Accessories from './pages/accessoriesPage/Accessories';
import Tablets from './pages/tabletsPage/Tablets';
import Heart from './pages/heartPage/Heart';
import ProductPage from './pages/productPage/ProductPage';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Basket from './pages/basketPage/Basket';
import { useLocalStorage } from './api';
import { FavoriteProduct } from './types/FavoriteProduct';
import { BasketProduct } from './types/BasketProduct';

export const App = () => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteProduct[]>(
    'favorites',
    [],
  );
  const [baskets, setBaskets] = useLocalStorage<BasketProduct[]>('baskets', []);
  const removeBaskets = (itemid: string) => {
    const updatedBaskets = baskets.filter(basket => basket.itemId !== itemid);

    setBaskets(updatedBaskets);
  };

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Home favorites={favorites} baskets={baskets} />}
          />
          <Route
            path="/phones"
            element={
              <Phones
                favorites={favorites}
                setFavorites={setFavorites}
                baskets={baskets}
                setBaskets={setBaskets}
              />
            }
          />
          <Route
            path="/tablets"
            element={
              <Tablets
                favorites={favorites}
                setFavorites={setFavorites}
                baskets={baskets}
                setBaskets={setBaskets}
              />
            }
          />
          <Route
            path="/accessories"
            element={
              <Accessories
                favorites={favorites}
                setFavorites={setFavorites}
                baskets={baskets}
                setBaskets={setBaskets}
              />
            }
          />
          <Route
            path="/heart"
            element={
              <Heart
                favorites={favorites}
                setFavorites={setFavorites}
                baskets={baskets}
                setBaskets={setBaskets}
              />
            }
          />
          <Route
            path="/basket"
            element={
              <Basket
                favorites={favorites}
                baskets={baskets}
                setBaskets={setBaskets}
                removeBaskets={removeBaskets}
              />
            }
          />
          <Route
            path="/:category/:id"
            element={
              <ProductPage
                favorites={favorites}
                setFavorites={setFavorites}
                baskets={baskets}
                setBaskets={setBaskets}
              />
            }
          />
        </Routes>
      </div>
    </HashRouter>
  );
};
