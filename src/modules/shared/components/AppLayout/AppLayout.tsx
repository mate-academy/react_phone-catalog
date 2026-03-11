import React from 'react';
import styles from './AppLayout.module.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Outlet } from 'react-router-dom';
import { Category } from '../../../../types/Category';
import { Product } from '../../../../types/Product';
import { useFavorites } from '../../hooks/useFavorites';

interface Props {
  categories: Category[];
  products: Product[];
}

export const AppLayout: React.FC<Props> = ({ categories, products }) => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className={styles.layout}>
      <Header categories={categories} />
      <main className={styles.main}>
        <Outlet context={{ categories, products, favorites, toggleFavorite }} />
      </main>
      <Footer />
    </div>
  );
};
