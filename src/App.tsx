import React from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const App = () => {
  return (
    <div className="App">
      <h1 className="visually-hidden">React Phone Catalog</h1>
      <Header />
      <Footer />
    </div>
  );
};

export default App;
