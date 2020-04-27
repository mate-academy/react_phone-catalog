import React, { FC } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { NoMatchMain } from '../../components/NoMatchMain';
import { Main } from '../../components/Main/Main';

export const NoMatchPage: FC = () => (
  <>
    <Header />
    <Main>
      <NoMatchMain />
    </Main>
    <Footer />
  </>
);
