import React from 'react';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UIKit } from './UIKit';

export const App = () => {
  return (
    <>
      <Header />
      <section>
        <h1>Main Page</h1>
      </section>
      <UIKit />
      <Footer />
    </>
  );
};
