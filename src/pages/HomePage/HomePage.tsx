import { Banner } from './Banner/Banner';
import './HomePage.scss';
import { Category } from './Category/Category';
import React from 'react';
import { HotPrices } from './HotPrices/HotPrices';
import { BrandNew } from './BrandNew/BrandNew';

export const HomePage = () => {
  return (
    <>
      <div className="homePage">
        <Banner />
      </div>
      <div className="homePage__content">
        <BrandNew />
        <Category />
        <HotPrices />
      </div>
    </>
  );
};
