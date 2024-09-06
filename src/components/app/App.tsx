import { FC, useEffect } from 'react';

import style from './App.module.scss';

import { useAppDispatch } from 'hooks/hook';
import { AppRoutes } from 'routes/Routes';

import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';

import { getProducts } from 'store/features/product/getProductsApi';
import { getPhones } from 'store/features/phones/getPhoneApi';
import { getTablets } from 'store/features/tablets/getTabletsApi';
import { getAccessories } from 'store/features/accessories/getAccessoriesApi';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getPhones());
    dispatch(getTablets());
    dispatch(getAccessories());
  }, [dispatch]);

  return (
    <div className={style.App}>
      <Header />
      <hr />
      <div className="container">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};
