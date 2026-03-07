import React, { useEffect, useState } from 'react';
import styles from './AppLayout.module.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Outlet } from 'react-router-dom';
import { getCategories } from '../../services/productService';
import { Category } from '../../../../types/Category';

export const AppLayout: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div className={styles.layout}>
      <Header categories={categories} />
      <main className={styles.main}>
        <Outlet context={categories} />
      </main>
      <Footer />
    </div>
  );
};
