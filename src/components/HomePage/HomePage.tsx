import React, { useEffect } from 'react';
import './HomePage.scss';
import { Banner } from '../Banner/Banner';
import { NewModels } from '../NewModels';
import { Category } from '../Category';
import { HotPrices } from '../HotPrices';

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="home-page">
      <div className="container">
        <h1 className="home-page__title">
          Product Catalog
          {/* Welcome to Nice Gadgets store! */}
        </h1>
        <Banner />
      </div>
      <NewModels />
      <Category />
      <HotPrices />
    </div>
  );
};
