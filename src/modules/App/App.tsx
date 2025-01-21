import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import styles from './App.module.scss';

import { Product } from '@sTypes/Product';
import { getProducts } from '@services/products';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { DispatchPhonesContext } from '@store/PhonesStore';
import { DispatchTabletsContext } from '@store/TabletStore';
import { DispatchAccessoriesContext } from '@store/AccessoriesStore';

export const App = () => {
  const dispatchPhones = useContext(DispatchPhonesContext);
  const dispatchTablets = useContext(DispatchTabletsContext);
  const dispatchAccessories = useContext(DispatchAccessoriesContext);

  // fetching data
  useEffect(() => {
    getProducts().then(products => {
      const phones: Product[] = [];
      const tablets: Product[] = [];
      const accessories: Product[] = [];

      products.forEach(product => {
        switch (product.category) {
          case 'phones':
            phones.push(product);
            break;

          case 'tablets':
            tablets.push(product);
            break;

          case 'accessories':
            accessories.push(product);
            break;
        }
      });

      dispatchPhones({ type: 'set', payload: phones });
      dispatchTablets({ type: 'set', payload: tablets });
      dispatchAccessories({ type: 'set', payload: accessories });
    });
  }, [dispatchPhones, dispatchTablets, dispatchAccessories]);

  return (
    <div className={styles.app}>
      <div className={styles.app__header}>
        <Header />
      </div>

      <div className={styles.app__content}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
