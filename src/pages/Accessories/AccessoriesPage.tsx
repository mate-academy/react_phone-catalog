import React from 'react';
import { Header } from '../Home/components/Header/Header';
import { Footer } from '../Home/components/Footer/Footer';
import { Main } from './components/Main/Main';
import './AccessoriesPage.scss';

export const AccessoriesPage = () => (
  <div className="Page">
    <Header />
    <Main />
    <Footer />
  </div>
);
