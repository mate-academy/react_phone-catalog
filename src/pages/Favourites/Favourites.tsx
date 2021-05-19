import React from 'react';
import { Header } from '../Home/components/Header/Header';
import { Footer } from '../Home/components/Footer/Footer';
import { Main } from './Main/Main';
import './Favourites.scss';

export const Favourites = () => (
  <div className="Page">
    <Header />
    <Main />
    <Footer />
  </div>
);
