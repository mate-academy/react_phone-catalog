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
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

export const App = () => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteProduct[]>(
    'favorites',
    [],
  );
  const [baskets, setBaskets] = useLocalStorage<BasketProduct[]>('baskets', []);
  const removeBaskets = (itemId: string) => {
    const updatedBaskets = baskets.filter(basket => basket.itemId !== itemId);

    setBaskets(updatedBaskets);
  };

  const handleIncrease = (itemId: string) => {
    setBaskets(prev => {
      console.log('clicked id:', itemId);
      console.log('prev:', prev);

      return prev.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  };

  const handleDecrease = (itemId: string) => {
    setBaskets(prev =>
      prev.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  return (
    <HashRouter>
      {' '}
      <Header favorites={favorites} baskets={baskets} />
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
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
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
      <Footer />
    </HashRouter>
  );
};
