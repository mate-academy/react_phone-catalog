import './App.scss';
import { useEffect, useState } from 'react';


import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Outlet } from 'react-router-dom';
import { init } from './features/ProductSlice';

import { useAppDispatch} from './app/hooks'
import { Container } from './components/container/Container';
export const App = () => {

    const dispach = useAppDispatch();

  useEffect(() => {
    dispach(init())
    }, [])



  return (
    <><Header />
      
        <Outlet />


   <Footer />
  </>)
};

