import './App.scss';
import './styles/globals.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { HomePage } from './components/Home/HomePage';
import { Route, Routes } from 'react-router-dom';
import { MobilePhones } from './components/MobilePhones/MobilePhones';
import { PhonePage } from './components/PhonePage/PhonePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Tablets } from './components/Tablets/Tablets';
import { Accessories } from './components/Accessories/Accessories';
import { TabletPage } from './components/TabletPage/TabletPage';
import { AccessoryPage } from './components/AccessoryPage/AccessoryPage';
import { Cart } from './components/Cart/Cart';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Favorites } from './components/Favorites/Favorites';

export const App = () => (
  <div className="App">
    <FavoritesProvider>
      <ShoppingCartProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<MobilePhones />} />
            <Route path="/tablets" element={<Tablets />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/phones/:itemId" element={<PhonePage />} />
            <Route path="/tablets/:itemId" element={<TabletPage />} />
            <Route path="/accessories/:itemId" element={<AccessoryPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </ShoppingCartProvider>
    </FavoritesProvider>

    <Footer />
  </div>
);
