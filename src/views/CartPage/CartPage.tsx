import React, { FC } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Cart from '../../components/Cart/Cart';
import { Main } from '../../components/Main/Main';

export const CartPage: FC = () => (
  <>
    <Header />
    <Main>
      <Cart />
    </Main>
    <Footer />
  </>
);
