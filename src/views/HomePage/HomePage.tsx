import React, { FC } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Home from '../../components/Home/Home';
import { Main } from '../../components/Main/Main';

export const HomePage: FC = () => (
  <>
    <Header />
    <Main>
      <Home />
    </Main>
    <Footer />
  </>
);
