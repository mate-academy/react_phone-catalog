import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Back } from '../../components/Back/Back';
import { CartBlock } from '../../components/CartBlock/CartBlock';
import './Cart.scss';

export const Cart = () => (
  <div className="Page">
    <Header />

    <main className="Main">
      <div className="Main-Container">
        <Back />
        <h1 className="Cart-Title">
          Cart
        </h1>
        <CartBlock />
      </div>
    </main>

    <Footer />
  </div>
);
