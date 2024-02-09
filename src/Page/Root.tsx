import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchPhones,
  selectPhonesStatus,
} from '../features/phoneSlice';
import { MainNavigation } from '../components/MainNavigation';
import { Footer } from '../components/Footer';
import { Box } from '../UI';

export const Root = () => {
  const phonesStatus = useAppSelector(selectPhonesStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (phonesStatus === 'loading') {
      setTimeout(() => dispatch(fetchPhones()), 1000);
    }
  }, [phonesStatus, dispatch]);

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
