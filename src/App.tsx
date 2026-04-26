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
import BurgerMenu from './pages/BurgerMenu/BurgerMenu';
import { AppContext } from './AppContext';

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
      <AppContext.Provider
        value={{
          favorites,
          setFavorites,
          baskets,
          setBaskets,
          removeBaskets,
          handleIncrease,
          handleDecrease,
        }}
      >
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phones" element={<Phones />} />
            <Route path="/tablets" element={<Tablets />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/heart" element={<Heart />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/:category/:id" element={<ProductPage />} />

            <Route path="/burgermenu" element={<BurgerMenu />} />
          </Routes>
        </div>
        <Footer />
      </AppContext.Provider>
    </HashRouter>
  );
};
