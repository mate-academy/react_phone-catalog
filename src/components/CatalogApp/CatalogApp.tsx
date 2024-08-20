import React from 'react';
import './CatalogApp.scss';
import { Navbar } from './../Navbar';
import { Footer } from './../footer';
import { Main } from './../main';

export const CatalogApp: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="flex-main">
        <Main />
      </div>
      <Footer />
    </div>
  );
};
