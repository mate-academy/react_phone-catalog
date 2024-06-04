import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchProducts,
  selectProductsStatus,
} from '../features/productsSlice';
import { MainNavigation } from '../components/MainNavigation';
import { Footer } from '../components/Footer';
import { Box } from '../UI';

export const Root = () => {
  const productsStatus = useAppSelector(selectProductsStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productsStatus === 'loading') {
      setTimeout(() => dispatch(fetchProducts()), 1000);
    }
  }, [productsStatus, dispatch]);

  return (
    <>
      <MainNavigation />

      <main>
        <Box>
          <Outlet />
        </Box>
      </main>

      <Footer />
    </>
  );
};
