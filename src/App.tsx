import './App.scss';
import { useEffect, useState } from 'react';


import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Outlet, useLocation } from 'react-router-dom';
import { init } from './features/ProductSlice';

import { useAppDispatch} from './app/hooks'

export const App = () => {
  const location = useLocation();
  const category = location.pathname.split('/')[1];

    const dispach = useAppDispatch();

  useEffect(() => {
    
    dispach(init(category))
    }, [category])



  return (
    <><Header />
 <Outlet />
 <Footer />
  </>)
};

