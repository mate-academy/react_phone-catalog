import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { FavouritesBlock } from '../../components/FavouritesBlock/FavouritesBlock';
import './Favourites.scss';

export const Favourites = () => (
  <div className="Page">
    <Header />

    <main className="Main">
      <div className="Main-Container">
        <Breadcrumbs />
        <h1 className="Favourites-Title">
          Favourites
        </h1>
        <FavouritesBlock />
      </div>
    </main>

    <Footer />
  </div>
);
