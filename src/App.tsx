import React from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Carousel } from './components/Carousel';
import { ShowcaseBlock } from './components/ShowcaseBlock';

const App = () => {
  return (
    <div className="app">
      <h1 className="visually-hidden">React Phone Catalog</h1>
      <Header />
      <Carousel />
      <ShowcaseBlock title="Hot prices" />
      <ShowcaseBlock title="Brand new models" />
      <Footer />
    </div>
  );
};

export default App;
