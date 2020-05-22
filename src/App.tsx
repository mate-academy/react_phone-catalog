import React from 'react';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <section className="section">
          <h1>Main Page</h1>
        </section>
      </div>
      <Footer />
    </>
  );
};
