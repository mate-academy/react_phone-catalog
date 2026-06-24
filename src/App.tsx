import styles from './App.module.scss';
import { BurgerMenu } from './components/BurgerMenu';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';

export const App = () => (
  <CartProvider>
    <div className={styles.app}>
      <MenuProvider>
        <header className={styles.header}>
          <Header />
        </header>
        <BurgerMenu />
      </MenuProvider>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  </CartProvider>
);
