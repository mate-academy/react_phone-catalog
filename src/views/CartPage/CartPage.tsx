import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CartMain } from '../../components/CartMain';

export const CartPage = () => (
  <>
    <Header />
    <main className="main">
      <CartMain />
    </main>
    <Footer />
  </>
);
