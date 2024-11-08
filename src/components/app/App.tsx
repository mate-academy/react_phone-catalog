import { FC, useEffect } from 'react';

import { AppRoutes } from '@routes/Routes';

import { Footer } from '@components/footer/Footer';
import { Header } from '@components/header/';

import { Loader } from '@ui/index';

import { useAppSelector, useProducts } from '@hooks/index';
import { useAction } from '@hooks/useActions';

import styles from './App.module.scss';

export const App: FC = () => {
  const { getProducts, getPhones, getTablets, getAccessories } = useAction();
  const { loading: productsLoading } = useProducts();
  const phonesLoading = useAppSelector(state => state.phones.loading);
  const tabletsLoading = useAppSelector(state => state.tablets.loading);
  const accessoriesLoading = useAppSelector(state => state.accessories.loading);

  const isLoading =
    productsLoading || phonesLoading || tabletsLoading || accessoriesLoading;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getProducts(),
          getPhones(),
          getTablets(),
          getAccessories(),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [getProducts, getPhones, getTablets, getAccessories]);

  return (
    <div className={styles.App}>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <main>
          <div className="container">
            <AppRoutes />
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
};
