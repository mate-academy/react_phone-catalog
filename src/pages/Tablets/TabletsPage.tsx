import React from 'react';
import { Header } from '../Home/components/Header/Header';
import { Footer } from '../Home/components/Footer/Footer';
import { Main } from './components/Main/Main';
import './TabletsPage.scss';

export const TabletsPage = () => (
  <div className="Page">
    <Header />
    <Main />
    <Footer />
  </div>
);
