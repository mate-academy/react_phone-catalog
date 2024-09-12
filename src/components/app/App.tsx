import { FC, useEffect } from 'react';

import { Header } from '@components/header/Header';
import { Footer } from '@components/footer/Footer';

import { AppRoutes } from '@routes/Routes';

import { getProducts } from '@store/features/product/getProductsApi';
import { getPhones } from '@store/features/phones/getPhoneApi';
import { getTablets } from '@store/features/tablets/getTabletsApi';
import { getAccessories } from '@store/features/accessories/getAccessoriesApi';
import { useAppDispatch } from '@hooks/hook';

import styles from './App.module.scss';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getPhones());
    dispatch(getTablets());
    dispatch(getAccessories());
  }, [dispatch]);

  console.log('Render App');

  return (
    <div className={styles.App}>
      <Header />
      <main>
        <div className="container">
          <AppRoutes />
        </div>
      </main>
      <Footer />
    </div>
  );
};
