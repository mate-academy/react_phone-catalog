import React from 'react';
import './FavoritesPage.module.scss';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';

export const FavoritesPage: React.FC = () => {
  return (
    <div>
      <Header />
      <h1 className="visually-hidden">Favorites Page</h1>
      <p>Favorites Page content goes here.</p>
      <img src="./../../img/banner-phones.png" alt="" />
      <img src="./../../img/banner-phones.png" alt="" />
      <Footer />
    </div>
  );
};
