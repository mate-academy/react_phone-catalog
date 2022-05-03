import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import './NotFoundPage.scss';

export const NotFoundPage = () => (
  <div className="Page">
    <Header />

    <main className="Main">
      <div className="Main-Container">
        <h1 className="Main-Title">
          Page not found
        </h1>
      </div>
    </main>

    <Footer />
  </div>
);
