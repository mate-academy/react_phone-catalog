import React, { FC } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Tablets } from '../../components/Tablets';
import { Main } from '../../components/Main/Main';

export const TabletsPage: FC = () => (
  <>
    <Header />
    <Main>
      <Tablets />
    </Main>
    <Footer />
  </>
);
