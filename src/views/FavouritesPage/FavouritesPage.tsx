import React, { FC } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Favourites from '../../components/Favourites/Favouriets';
import { Main } from '../../components/Main/Main';

export const FavouritesPage: FC = () => (
  <>
    <Header />
    <Main>
      <Favourites />
    </Main>
    <Footer />
  </>
);
