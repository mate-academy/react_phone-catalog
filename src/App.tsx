import React from 'react';
import { HotPrices } from './components/HotPrices';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const App = () => {
  return (
    <div className="App">
      <h1 className="visually-hidden">React Phone Catalog</h1>
      <Header />
      <HotPrices />
      <Footer />
    </div>
  );
};

export default App;
