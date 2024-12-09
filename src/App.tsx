import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { useAppDispatch } from './utils/hooks';
import { useEffect } from 'react';
import * as productActions from './features/products';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productActions.init());
  }, [dispatch]);

  return (
    <div className="box-border bg-white font-mont-regular">
      <NavBar />

      <div className="m-auto min-h-screen max-w-[1200px]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
