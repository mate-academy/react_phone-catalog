import React from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Carousel } from './components/Carousel';

const App = () => {
  return (
    <div className="app">
      <h1 className="visually-hidden">React Phone Catalog</h1>
      <Header />
      <Carousel />
      <Footer />
    </div>
  );
};

export default App;
