import React from 'react';
import { Header } from '../Home/components/Header/Header';
import { Footer } from '../Home/components/Footer/Footer';
import { Main } from './components/Main/Main';
import './PhonesPage.scss';

export const PhonesPage = () => (
  <div className="Page">
    <Header />
    <Main />
    <Footer />
  </div>
);
