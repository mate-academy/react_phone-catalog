import { Outlet } from 'react-router-dom';
import './styles/App.module.scss';
import styles from './styles/App.module.scss';
import { Header } from './modules/shared/components/Layout/Header';
import { Footer } from './modules/shared/components/Layout/Footer';
import { FavoriteProvider } from './contexts/FavoritesContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';

export const App = () => {
  return (
    <FavoriteProvider>
      <CartProvider>
        <ThemeProvider>
          <div className={styles.appLayout}>
            <Header />

            <main className={styles.mainContent}>
              <Outlet />
            </main>

            <Footer />
          </div>
        </ThemeProvider>
      </CartProvider>
    </FavoriteProvider>
  );
};
