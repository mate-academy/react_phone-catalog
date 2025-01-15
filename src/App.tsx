import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { useAppDispatch } from './utils/hooks';
import React, { useEffect } from 'react';
import * as productActions from './features/products';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productActions.init());
  }, [dispatch]);

  return (
    <div className="box-border bg-white font-mont-regular">
      <NavBar />

      <div>
        <div className="m-auto min-h-screen max-w-[1200px]">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};
