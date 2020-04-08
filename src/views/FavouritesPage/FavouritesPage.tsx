import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { FavouritesMain } from '../../components/FavouritesMain';

export const FavouritesPage = () => (
  <>
    <Header />
    <main className="main">
      <FavouritesMain />
    </main>
    <Footer />
  </>
);
