import React, { FC } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Accessories from '../../components/Accessories/Accessories';
import { Main } from '../../components/Main/Main';

export const AccessoriesPage: FC = () => (
  <>
    <Header />
    <Main>
      <Accessories />
    </Main>
    <Footer />
  </>
);
