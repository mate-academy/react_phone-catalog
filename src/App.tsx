import './App.module.scss';
import React, { useState, useEffect } from 'react';
import { Loader } from './components/Loader/Loader';
import { BannerSlider } from './components/BannerSlider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductSlider } from './components/ProductSlider';
import { Thumbnails } from './components/Thumbnails';
import { PreviousPage } from './components/PreviousPage';
import { useLocation } from 'react-router-dom';

export const App: React.FC = () => {
  const category = useLocation().pathname.slice(1)

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    alert('This website is under constuction and some features have not been implemented!')
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <PreviousPage category= {category}/>
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
