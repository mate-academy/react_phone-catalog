import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoriteContext';
import { ThemeProvider } from './modules/shared/context/ThemeContext';
import { AppRoutes } from './Routes';
import './styles/global.scss';
import { NightModeStars } from './components/NightModeStars/NightModeStars';

const App: React.FC = () => {
  useTranslation();

  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <div className="app">
            <NightModeStars />
            <Header />
            <main>
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
