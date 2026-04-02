import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import type { CartItem, Product } from '../../../types';
import styles from './Layout.module.scss';

type Props = {
  cart: CartItem[];
  favorites: Product[];
};

export const Layout: React.FC<Props> = ({ cart, favorites }) => {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const favoritesCount = favorites.length;

  return (
    <div className={styles.page}>
      <Header cartCount={totalQuantity} favoritesCount={favoritesCount} />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer className={styles.footer} />
    </div>
  );
};
