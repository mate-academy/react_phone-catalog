import './App.module.scss';
import React, { useState, useEffect } from 'react';
import { Loader } from './components/Loader/Loader';
import { BannerSlider } from './components/BannerSlider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductSlider } from './components/ProductSlider';
import { Thumbnails } from './components/Thumbnails';

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
          <Header />
          <BannerSlider />
          <ProductSlider title="Brand new models" count={10}/>
          <Thumbnails />
          <ProductSlider title="Hot prices" count={10}/>
          <Footer />
        </div>
      )}
    </div>
  );
};
