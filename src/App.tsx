import styles from './App.module.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';
import { CartProvider } from './context/CartContext';

export const App: React.FC = () => {
  return (
    <MenuProvider>
      <CartProvider>
        <div data-cy="app" className={styles.app}>
          <Header />
          <div className={styles.outlet}>
            <Outlet />
          </div>
          <Footer />
        </div>
      </CartProvider>
    </MenuProvider>
  );
};
