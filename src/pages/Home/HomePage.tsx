import React from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import './HomePage.scss';

export const HomePage = () => (
  <div className="Page">
    <Header />
    <Main />
    <Footer />
  </div>
);
