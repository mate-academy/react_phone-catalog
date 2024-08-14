import './App.module.scss';

import React, { useState, useEffect } from 'react';

import { Loader } from './components/Loader/Loader';
import { BannerSlider } from './components/BannerSlider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UnderConstruction } from './components/UnderConstruction';
import { ProductSlider } from './components/ProductSlider';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <UnderConstruction />
          <Header />
          <BannerSlider />
          <ProductSlider title="Brand new models" />
          <ProductSlider title="Hot prices" />
          <Footer />
        </div>
      )}
    </div>
  );
};
