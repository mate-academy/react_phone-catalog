import React from 'react';
import { useCart } from '../../Context/Context';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/header';
import { Main } from '../Main/Main';
import './Home.scss';

export const Home = () => {
  const { totalQuantity } = useCart();

  return (
    <div className="page__body">
      <Header cartItemsCount={totalQuantity} />
      <div className="container">
        <Main />
      </div>
      <Footer />
    </div>
  );
};
