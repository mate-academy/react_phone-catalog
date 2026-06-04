import { Outlet } from 'react-router-dom';
import { CartProvider } from './cart-context/CartContext';
import { FavoriteProvider } from './favorites-context/FavoritesContext';
import './styles/App.module.scss';
import styles from './styles/App.module.scss';
import { Header } from './modules/shared/components/Layout/Header';
import { Footer } from './modules/shared/components/Layout/Footer';

export const App = () => {
  return (
    <FavoriteProvider>
      <CartProvider>
        <div className={styles.appLayout}>
          <Header />

          <main className={styles.mainContent}>
            <Outlet />
          </main>

          <Footer />
        </div>
      </CartProvider>
    </FavoriteProvider>
  );
};
