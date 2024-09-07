import { FC, useEffect } from 'react';

import { Header } from '@components/header/Header';

import { Footer } from '@components/footer/Footer';

import { AppRoutes } from '@routes/Routes';

import { getProducts } from '@store/features/product/getProductsApi';
import { getPhones } from '@store/features/phones/getPhoneApi';
import { getTablets } from '@store/features/tablets/getTabletsApi';
import { getAccessories } from '@store/features/accessories/getAccessoriesApi';
import { useAppDispatch } from '@hooks/hook';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getPhones());
    dispatch(getTablets());
    dispatch(getAccessories());
  }, [dispatch]);

  return (
    <div className="App">
      <h1 className="visually-hidden">Product Catalog</h1>

      <Header />
      <hr />
      <div className="container">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};
