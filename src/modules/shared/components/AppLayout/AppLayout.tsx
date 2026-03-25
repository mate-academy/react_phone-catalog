import React, { useMemo } from 'react';
import styles from './AppLayout.module.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Outlet } from 'react-router-dom';
import { Category } from '../../../../types/Category';
import { Product } from '../../../../types/Product';
import { useFavorites } from '../../hooks/useFavorites';
import { useCart } from '../../hooks/useCart';

interface Props {
  categories: Category[];
  products: Product[];
}

export const AppLayout: React.FC<Props> = ({ categories, products }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCart();

  const favoritesCount = favorites.length;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const contextValue = useMemo(
    () => ({
      categories,
      products,
      favorites,
      toggleFavorite,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [
      categories,
      products,
      favorites,
      toggleFavorite,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ],
  );

  return (
    <div className={styles.layout}>
      <Header
        categories={categories}
        favoritesCount={favoritesCount}
        cartCount={cartCount}
      />

      <main className={styles.main}>
        <Outlet context={contextValue} />
      </main>

      <Footer />
    </div>
  );
};
