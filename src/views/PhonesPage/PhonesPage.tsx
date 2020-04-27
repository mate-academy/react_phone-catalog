import React, { FC } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Phones from '../../components/Phones/Phones';
import { Main } from '../../components/Main/Main';

export const PhonesPage: FC = () => (
  <>
    <Header />
    <Main>
      <Phones />
    </Main>
    <Footer />
  </>
);
