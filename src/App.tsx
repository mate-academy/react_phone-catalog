import './App.scss';
import { useEffect, useState } from 'react';


import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Outlet, useLocation } from 'react-router-dom';
import { init } from './features/ProductSlice';

import { useAppDispatch} from './app/hooks'

export const App = () => {
 

    const dispach = useAppDispatch();

  useEffect(() => {

    dispach(init())
    }, [dispach])



  return (
    <><Header />
 <Outlet />
 <Footer />
  </>)
};

