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
import { Product } from './types/Product';

export const App = () => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  const isFavorite = favorites.some(p => p.itemId === product.itemId);

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home favorites={favorites} />} />
          <Route
            path="/phones"
            element={
              <Phones
                favorites={favorites}
                setFavorites={setFavorites}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/tablets"
            element={
              <Tablets
                favorites={favorites}
                setFavorites={setFavorites}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/accessories"
            element={
              <Accessories
                favorites={favorites}
                setFavorites={setFavorites}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/heart"
            element={
              <Heart
                favorites={favorites}
                setFavorites={setFavorites}
                isFavorite={isFavorite}
              />
            }
          />
          <Route path="/basket" element={<Basket favorites={favorites} />} />
          <Route
            path="/:category/:id"
            element={
              <ProductPage
                favorites={favorites}
                isFavorite={isFavorite}
                setFavorites={setFavorites}
              />
            }
          />
        </Routes>
      </div>
    </HashRouter>
  );
};
