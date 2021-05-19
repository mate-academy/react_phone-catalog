import React from 'react';
import { Header } from '../Home/components/Header/Header';
import { Footer } from '../Home/components/Footer/Footer';
import { Main } from './components/Main/Main';
import './Cart.scss';

export const Cart = () => (
  <div className="Page">
    <Header />
    <Main />
    <Footer />
  </div>
);
