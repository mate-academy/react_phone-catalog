import { FC, useEffect } from 'react';

<<<<<<< HEAD
import { Header } from '@components/header/Header';

import { Footer } from '@components/footer/Footer';

import { AppRoutes } from '@routes/Routes';

import { getProducts } from '@store/features/product/getProductsApi';
import { getPhones } from '@store/features/phones/getPhoneApi';
import { getTablets } from '@store/features/tablets/getTabletsApi';
import { getAccessories } from '@store/features/accessories/getAccessoriesApi';
import { useAppDispatch } from '@hooks/hook';
=======
import style from './App.module.scss';

import { useAppDispatch } from 'hooks/hook';
import { AppRoutes } from 'routes/Routes';

import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';

import { getProducts } from 'store/features/product/getProductsApi';
import { getPhones } from 'store/features/phones/getPhoneApi';
import { getTablets } from 'store/features/tablets/getTabletsApi';
import { getAccessories } from 'store/features/accessories/getAccessoriesApi';
>>>>>>> 3d29229bf5a890910a3e7c1d3c6b79a9929789c2

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getPhones());
    dispatch(getTablets());
    dispatch(getAccessories());
  }, [dispatch]);

  return (
<<<<<<< HEAD
    <div className={'App'}>
      <h1 className="visually-hidden">Product Catalog</h1>

=======
    <div className={style.App}>
>>>>>>> 3d29229bf5a890910a3e7c1d3c6b79a9929789c2
      <Header />
      <hr />
      <div className="container">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};
